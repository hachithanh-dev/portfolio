import { Lock } from "lucide-react";
import ArticleLayout, { type TocItem } from "@/components/article/ArticleLayout";
import { DecisionTable, H2 } from "@/components/article/Prose";
import PipelineDiagram from "@/components/projects/PipelineDiagram";
import { CASE_STUDY_STACK } from "./stack";
import type { Lang } from "@/lib/i18n";

const TOC: Record<Lang, TocItem[]> = {
  en: [
    { id: "context", title: "Context" },
    { id: "constraints", title: "Constraints" },
    { id: "architecture", title: "Architecture" },
    { id: "decisions", title: "Decisions & trade-offs" },
    { id: "quality", title: "Quality & delivery" },
    { id: "lessons", title: "What I learned" },
  ],
  vi: [
    { id: "context", title: "Bối cảnh" },
    { id: "constraints", title: "Ràng buộc" },
    { id: "architecture", title: "Kiến trúc" },
    { id: "decisions", title: "Quyết định & đánh đổi" },
    { id: "quality", title: "Chất lượng & triển khai" },
    { id: "lessons", title: "Bài học" },
  ],
};

function Meta({ lang }: { lang: Lang }) {
  return (
    <>
      <span className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1">
        <Lock className="h-3 w-3" /> {lang === "vi" ? "Khách hàng bảo mật (NDA)" : "Client under NDA"}
      </span>
      <span>{lang === "vi" ? "Kỹ sư Backend" : "Backend Engineer"}</span>
      <span className="text-white/50">/</span>
      <span>2026 — {lang === "vi" ? "nay" : "present"}</span>
    </>
  );
}

function BodyEn() {
  return (
    <>
      <H2 id="context">Context</H2>
      <p>
        A multi-channel e-commerce brand sells across marketplaces, runs paid ads on each of them and earns
        royalties on a separate channel. Its leadership team wanted one place to answer the daily questions:{" "}
        <strong>are we profitable this month, which listings drive it, and do we have enough stock to keep selling?</strong>
      </p>
      <p>
        I own the analytics service behind that <em>Command Center</em>: the APIs for the P&amp;L, KPI cards, trends,
        listing tables, inventory health and Excel imports of the selling plan. The frontend and the data pipeline
        belong to other teams, so a large part of the job is the contract between us.
      </p>

      <H2 id="constraints">Constraints</H2>
      <ul>
        <li>
          <strong>The warehouse is not mine.</strong> Raw marketplace data reaches PostgreSQL through a CDC pipeline run by
          the data team. In production they own the schema, partitions and aggregates; my migrations target a disposable
          database, and every schema change ships with a hand-off script for them.
        </li>
        <li>
          <strong>Data arrives late and incomplete.</strong> Sources land at different times and grains. A missing day must
          never look like a zero-sales day.
        </li>
        <li>
          <strong>One analytics process, one shared database.</strong> No extra infrastructure to hide slow reads behind,
          and the database server is shared with the pipeline.
        </li>
        <li>
          <strong>Correctness first.</strong> The numbers feed decisions about money and purchasing. A faster answer that
          differs from the source by a cent is a bug.
        </li>
      </ul>

      <H2 id="architecture">Architecture</H2>
      <p>
        The backend is a Maven multi-module platform on Java 21 and Spring Boot 4: a shared module, an organization
        module for users and roles, and the analytics module this case study is about.
      </p>
      <div className="not-prose my-8">
        <PipelineDiagram />
      </div>
      <p>A dashboard read goes through four steps:</p>
      <ol>
        <li>
          <strong>Validate and authorize the context</strong> — period, comparison mode, channel, tags and filters are
          normalized, and the caller&apos;s business scope is checked before any SQL runs.
        </li>
        <li>
          <strong>Plan the measurement</strong> — work out which metrics, windows and nodes the screen actually shows, so
          nothing is computed for cells nobody sees.
        </li>
        <li>
          <strong>Read with plain SQL</strong> — repositories use <code>JdbcClient</code> with parameterized SQL. Every
          fact query carries a time predicate so PostgreSQL prunes partitions.
        </li>
        <li>
          <strong>Return API DTOs with data quality labels</strong> — values come with their completeness state and data
          version, never as JPA entities.
        </li>
      </ol>
      <p>
        Two platform rules hold everywhere: references across databases are <em>soft links</em> by UUID rather than
        foreign keys, and service transactions contain database work only — no HTTP, cache or messaging inside a
        transaction.
      </p>

      <H2 id="decisions">Decisions &amp; trade-offs</H2>
      <p>
        I recorded each significant choice as an Architecture Decision Record — more than thirty by now. The ones that
        shaped the system most:
      </p>
      <DecisionTable
        head={["Decision", "Why", "Cost I accepted"]}
        rows={[
          [
            "Hand-written SQL on the read path",
            "Full control over plans, partition pruning and set-based checks on large fact tables.",
            "More SQL to own — guarded by integration tests on real PostgreSQL and SQL-count regression tests.",
          ],
          [
            "Explicit partial-data states",
            "Leaders must see that a day or source is missing instead of a silent zero.",
            "A richer API contract and more work for the frontend to label values.",
          ],
          [
            "Soft links instead of foreign keys",
            "Databases owned by different teams can evolve and scale independently.",
            "Integrity is checked in the application and the pipeline, not by the database.",
          ],
          [
            "Versioned table reads",
            "Paged tables return the data version; a mismatch answers 409 so the client never mixes two snapshots.",
            "Tables cannot be served from a cache; clients must handle a refetch.",
          ],
          [
            "Limit load before caching",
            "Bounded concurrency and shared identical reads protect the connection pool; a short cache comes after, behind a flag.",
            "Some requests wait or are told to retry instead of all starting at once.",
          ],
          [
            "Strict Excel import validation",
            "Selling plans publish directly, so invalid or unresolved rows must block the whole file.",
            "Users fix their file before anything is published.",
          ],
        ]}
      />

      <H2 id="quality">Quality &amp; delivery</H2>
      <ul>
        <li>
          <strong>Integration tests on real PostgreSQL</strong> with Testcontainers — the partitioning and SQL are tested
          against the engine that runs them.
        </li>
        <li>
          <strong>Architecture rules as tests</strong> with ArchUnit (for example, no API DTOs in new repository
          signatures), plus NullAway and Spotless in the build.
        </li>
        <li>
          <strong>Refactors prove sameness</strong> — before and after an optimization, every response the frontend
          requests is compared field by field, and exports cell by cell.
        </li>
        <li>
          <strong>Contracts on paper</strong> — OpenAPI, an error catalog, frontend hand-off notes and schema rollout
          scripts for the data team.
        </li>
        <li>
          <strong>Delivery</strong> — GitLab CI builds and ships Docker images; a staging environment with demo data lets
          the frontend team work without touching production.
        </li>
      </ul>

      <H2 id="lessons">What I learned</H2>
      <ul>
        <li>
          <strong>&ldquo;Missing&rdquo; is a value.</strong> Modelling incompleteness explicitly earned more trust than any
          speed-up.
        </li>
        <li>
          <strong>Reproduce before you optimize.</strong> A production-sized copy and the browser&apos;s real request
          pattern changed which fix I chose more than once.
        </li>
        <li>
          <strong>Write the decision down.</strong> ADRs made hand-offs with two other teams faster and kept me from
          re-arguing settled questions.
        </li>
      </ul>
      <div className="not-prose mt-10 flex flex-wrap gap-2">
        {CASE_STUDY_STACK.map((s) => (
          <span key={s} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-white/65">
            {s}
          </span>
        ))}
      </div>
    </>
  );
}

function BodyVi() {
  return (
    <>
      <H2 id="context">Bối cảnh</H2>
      <p>
        Một thương hiệu thương mại điện tử bán hàng trên nhiều sàn, chạy quảng cáo trên từng sàn và có thêm doanh thu bản
        quyền ở một kênh riêng. Ban lãnh đạo cần một nơi trả lời các câu hỏi hằng ngày:{" "}
        <strong>tháng này có lãi không, sản phẩm nào tạo ra lợi nhuận, và tồn kho có đủ để tiếp tục bán không?</strong>
      </p>
      <p>
        Tôi phụ trách service phân tích đứng sau <em>Command Center</em> đó: API cho P&amp;L, thẻ KPI, xu hướng, bảng sản
        phẩm, sức khỏe tồn kho và import kế hoạch bán hàng từ Excel. Frontend và pipeline dữ liệu thuộc về các team khác,
        nên một phần lớn công việc là thống nhất hợp đồng giữa các bên.
      </p>

      <H2 id="constraints">Ràng buộc</H2>
      <ul>
        <li>
          <strong>Kho dữ liệu không thuộc về tôi.</strong> Dữ liệu từ các sàn vào PostgreSQL qua pipeline CDC của team
          Data. Trên production, họ quản lý schema, partition và bảng tổng hợp; migration của tôi chạy trên database thử
          nghiệm, và mỗi thay đổi schema đi kèm script bàn giao cho họ.
        </li>
        <li>
          <strong>Dữ liệu đến muộn và không đủ.</strong> Mỗi nguồn về vào thời điểm và độ chi tiết khác nhau. Một ngày
          thiếu dữ liệu không bao giờ được trông giống một ngày không bán được hàng.
        </li>
        <li>
          <strong>Một process analytics, một database dùng chung.</strong> Không có hạ tầng phụ để che các lượt đọc chậm,
          và máy chủ database dùng chung với pipeline.
        </li>
        <li>
          <strong>Đúng trước, nhanh sau.</strong> Con số dùng để quyết định chi tiêu và nhập hàng. Một câu trả lời nhanh
          hơn nhưng lệch nguồn một xu cũng là lỗi.
        </li>
      </ul>

      <H2 id="architecture">Kiến trúc</H2>
      <p>
        Backend là nền tảng Maven nhiều module trên Java 21 và Spring Boot 4: một module dùng chung, một module tổ chức
        cho người dùng và phân quyền, và module analytics là chủ đề của case study này.
      </p>
      <div className="not-prose my-8">
        <PipelineDiagram />
      </div>
      <p>Một lượt đọc dashboard đi qua bốn bước:</p>
      <ol>
        <li>
          <strong>Chuẩn hóa và kiểm quyền ngữ cảnh</strong> — kỳ báo cáo, kiểu so sánh, kênh, tag và bộ lọc được chuẩn
          hóa, phạm vi kinh doanh của người gọi được kiểm tra trước khi chạy bất kỳ câu SQL nào.
        </li>
        <li>
          <strong>Lập kế hoạch tính toán</strong> — xác định đúng các chỉ số, cửa sổ thời gian và nút mà màn hình hiển
          thị, để không tính những ô không ai xem.
        </li>
        <li>
          <strong>Đọc bằng SQL thuần</strong> — repository dùng <code>JdbcClient</code> với SQL có tham số. Mọi truy vấn
          fact đều có điều kiện thời gian để PostgreSQL bỏ qua partition không liên quan.
        </li>
        <li>
          <strong>Trả DTO kèm nhãn chất lượng dữ liệu</strong> — giá trị đi cùng trạng thái đầy đủ và phiên bản dữ liệu,
          không bao giờ trả thẳng entity JPA.
        </li>
      </ol>
      <p>
        Hai quy tắc áp dụng cho toàn nền tảng: tham chiếu giữa các database là <em>soft link</em> bằng UUID thay vì khóa
        ngoại, và transaction của service chỉ chứa thao tác database — không gọi HTTP, cache hay message queue bên trong
        transaction.
      </p>

      <H2 id="decisions">Quyết định &amp; đánh đổi</H2>
      <p>
        Mỗi lựa chọn quan trọng đều được ghi thành Architecture Decision Record — đến nay đã hơn ba mươi bản. Những quyết
        định định hình hệ thống nhiều nhất:
      </p>
      <DecisionTable
        head={["Quyết định", "Lý do", "Cái giá chấp nhận"]}
        rows={[
          [
            "SQL viết tay cho đường đọc",
            "Toàn quyền kiểm soát execution plan, partition pruning và các phép kiểm tra theo tập trên bảng fact lớn.",
            "Nhiều SQL phải tự bảo trì — được canh bằng integration test trên PostgreSQL thật và test chặn số câu SQL.",
          ],
          [
            "Trạng thái dữ liệu thiếu tường minh",
            "Lãnh đạo phải thấy một ngày hay một nguồn đang thiếu, thay vì một số 0 im lặng.",
            "Hợp đồng API phức tạp hơn, frontend cần thêm công gắn nhãn giá trị.",
          ],
          [
            "Soft link thay cho khóa ngoại",
            "Các database do những team khác nhau quản lý có thể thay đổi và mở rộng độc lập.",
            "Tính toàn vẹn được kiểm ở ứng dụng và pipeline, không do database đảm bảo.",
          ],
          [
            "Bảng dữ liệu có phiên bản",
            "Bảng phân trang trả kèm phiên bản dữ liệu; lệch phiên bản trả 409 để client không trộn hai bản chụp.",
            "Bảng không thể phục vụ từ cache; client phải xử lý việc tải lại.",
          ],
          [
            "Giới hạn tải trước khi cache",
            "Giới hạn số lượt đọc đồng thời và gộp lượt đọc trùng để bảo vệ pool kết nối; cache ngắn hạn đến sau, bật bằng cờ cấu hình.",
            "Một số request phải chờ hoặc được yêu cầu thử lại, thay vì tất cả cùng chạy một lúc.",
          ],
          [
            "Kiểm tra chặt file Excel",
            "Kế hoạch bán hàng được áp dụng ngay, nên dòng sai hoặc không khớp phải chặn cả file.",
            "Người dùng sửa file trước khi bất cứ thứ gì được áp dụng.",
          ],
        ]}
      />

      <H2 id="quality">Chất lượng &amp; triển khai</H2>
      <ul>
        <li>
          <strong>Integration test trên PostgreSQL thật</strong> bằng Testcontainers — partition và SQL được kiểm tra trên
          chính engine sẽ chạy chúng.
        </li>
        <li>
          <strong>Quy tắc kiến trúc thành test</strong> bằng ArchUnit (ví dụ: không dùng DTO của API trong chữ ký repository
          mới), cùng NullAway và Spotless trong quá trình build.
        </li>
        <li>
          <strong>Refactor phải chứng minh kết quả không đổi</strong> — trước và sau mỗi lần tối ưu, mọi response mà
          frontend gọi được so từng trường, file export được so từng ô.
        </li>
        <li>
          <strong>Hợp đồng bằng văn bản</strong> — OpenAPI, danh mục mã lỗi, ghi chú bàn giao cho frontend và script triển
          khai schema cho team Data.
        </li>
        <li>
          <strong>Triển khai</strong> — GitLab CI build và đưa Docker image lên máy chủ; môi trường staging với dữ liệu mẫu
          giúp team frontend làm việc mà không chạm vào production.
        </li>
      </ul>

      <H2 id="lessons">Bài học</H2>
      <ul>
        <li>
          <strong>&ldquo;Thiếu&rdquo; cũng là một giá trị.</strong> Mô hình hóa sự thiếu hụt một cách tường minh tạo ra
          nhiều niềm tin hơn bất kỳ lần tăng tốc nào.
        </li>
        <li>
          <strong>Tái hiện trước khi tối ưu.</strong> Bản sao dữ liệu cỡ production và đúng cách trình duyệt gửi request
          đã nhiều lần làm tôi đổi hướng xử lý.
        </li>
        <li>
          <strong>Ghi quyết định ra giấy.</strong> ADR giúp bàn giao với hai team khác nhanh hơn và tránh tranh luận lại
          những vấn đề đã chốt.
        </li>
      </ul>
      <div className="not-prose mt-10 flex flex-wrap gap-2">
        {CASE_STUDY_STACK.map((s) => (
          <span key={s} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-white/65">
            {s}
          </span>
        ))}
      </div>
    </>
  );
}

export const CASE_STUDY_META = {
  en: {
    title: "E-commerce Command Center — case study",
    description:
      "How I built the analytics backend behind a leadership dashboard for a multi-channel e-commerce brand: context, architecture, decisions and trade-offs.",
  },
  vi: {
    title: "E-commerce Command Center — case study",
    description:
      "Cách tôi xây backend phân tích cho dashboard của ban lãnh đạo một thương hiệu thương mại điện tử đa kênh: bối cảnh, kiến trúc, quyết định và đánh đổi.",
  },
};

export default function CaseStudyPage({ lang }: { lang: Lang }) {
  const vi = lang === "vi";
  return (
    <ArticleLayout
      eyebrow={vi ? "Case study · Đang chạy production" : "Case study · In production"}
      title="E-commerce Command Center"
      lead={
        vi
          ? "Backend phân tích đứng sau dashboard của ban lãnh đạo một thương hiệu thương mại điện tử đa kênh — gom quảng cáo, doanh số, bản quyền và chuỗi cung ứng thành một bức tranh P&L để ra quyết định."
          : "The analytics backend behind a leadership dashboard for a multi-channel e-commerce brand — turning ads, sales, royalties and supply-chain data into one P&L and decision view."
      }
      meta={<Meta lang={lang} />}
      tags={["Java 21", "Spring Boot 4", "PostgreSQL", "JdbcClient", "Testcontainers"]}
      toc={TOC[lang]}
      backHash="projects"
    >
      {vi ? <BodyVi /> : <BodyEn />}
    </ArticleLayout>
  );
}
