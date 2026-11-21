import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import ArticleLayout, { type TocItem } from "@/components/article/ArticleLayout";
import { Callout, CodeBlock, DecisionTable, H2 } from "@/components/article/Prose";
import { localePath, type Lang } from "@/lib/i18n";
import { LOAD_LIMITS_POST, formatDate } from "./posts";

const GATE_CODE = `// Simplified sketch — the production class adds metrics and per-caller deadlines.
final class ReadGate {
  private final Semaphore permits;            // how many heavy reads may run at once
  private final AtomicInteger waiting = new AtomicInteger();
  private final int maxWaiting;               // bounded queue: never an unbounded pile-up
  private final Duration maxWait;             // sized from the client's retry rule

  <T> T run(Supplier<T> read) {
    if (waiting.incrementAndGet() > maxWaiting) {
      waiting.decrementAndGet();
      throw new ReadBusyException(retryAfter());   // 503 + Retry-After, zero connections used
    }
    boolean acquired;
    try {
      acquired = permits.tryAcquire(maxWait.toMillis(), MILLISECONDS);
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
      throw new ReadBusyException(retryAfter());
    } finally {
      waiting.decrementAndGet();
    }
    if (!acquired) throw new ReadBusyException(retryAfter());
    try {
      return read.get();                      // the transaction opens here — never before
    } finally {
      permits.release();
    }
  }
}`;

const SHARED_CODE = `// Simplified sketch of sharing identical reads (single-flight).
<T> T read(ReadKey key, Supplier<T> loader) {
  T hit = cache.getIfPresent(key);
  if (hit != null) return hit;                           // no connection at all

  CompletableFuture<T> mine = new CompletableFuture<>();
  CompletableFuture<T> running = inFlight.putIfAbsent(key, mine);
  if (running != null) return running.join();            // follower: wait for the leader

  try {
    T again = cache.getIfPresent(key);                   // re-check after winning the lead
    T value = again != null ? again : gate.run(loader);
    mine.complete(value);
    return value;
  } catch (RuntimeException e) {
    mine.completeExceptionally(e);
    throw e;
  } finally {
    inFlight.remove(key, mine);
  }
}`;

const TOC: Record<Lang, TocItem[]> = {
  en: [
    { id: "symptom", title: "The symptom" },
    { id: "why", title: "Why it happened" },
    { id: "faster", title: "Faster queries were not enough" },
    { id: "gate", title: "Step 1 — admission control" },
    { id: "shared", title: "Step 2 — share identical reads" },
    { id: "cache", title: "Step 3 — a short, honest cache" },
    { id: "measuring", title: "How I tested it" },
    { id: "rejected", title: "What I rejected" },
    { id: "takeaways", title: "Takeaways" },
  ],
  vi: [
    { id: "symptom", title: "Triệu chứng" },
    { id: "why", title: "Vì sao xảy ra" },
    { id: "faster", title: "Truy vấn nhanh hơn là chưa đủ" },
    { id: "gate", title: "Bước 1 — giới hạn tải" },
    { id: "shared", title: "Bước 2 — gộp lượt đọc trùng" },
    { id: "cache", title: "Bước 3 — cache ngắn và trung thực" },
    { id: "measuring", title: "Cách tôi kiểm chứng" },
    { id: "rejected", title: "Những phương án bị loại" },
    { id: "takeaways", title: "Bài học" },
  ],
};

function BodyEn() {
  return (
    <>
      <H2 id="symptom">The symptom</H2>
      <p>
        The analytics dashboard I work on was slow but usable when one person opened it. Then a few people opened it at
        the same moment, and every one of them got an error. The requests did not fail one by one — they failed{" "}
        <strong>together</strong>, after waiting for a long time.
      </p>
      <p>
        That pattern matters. Random failures point at a bug. Failures that arrive together, after a wait, point at a
        shared resource running out.
      </p>

      <H2 id="why">Why it happened</H2>
      <p>One page load of the dashboard is not one request. The frontend fires several heavy reads in parallel — KPI cards, the P&amp;L, trends, facets. Each read:</p>
      <ol>
        <li>borrows a connection from a fixed-size pool,</li>
        <li>keeps it for the whole query, which on large fact tables takes a while,</li>
        <li>and gives up with a <code>503</code> if it cannot get a connection or the query exceeds its timeout.</li>
      </ol>
      <p>
        Multiply the reads per page by the people opening the page and the pool is gone. Worse, the client retries once
        after a failure — so the moment the system is most overloaded is exactly when the load doubles.
      </p>
      <blockquote>The database was not the bottleneck by itself. The number of things asking it at once was.</blockquote>

      <H2 id="faster">Faster queries were not enough</H2>
      <p>
        My first move was the obvious one: make every read cheaper. I merged two scans of the P&amp;L table into one,
        replaced row-by-row existence checks with set-based ones, and stopped computing cells the screen never shows. To
        make sure nothing changed but speed, I compared every response the frontend requests, field by field, before and
        after.
      </p>
      <p>
        It helped each request. It did not change the shape of the failure. A cheaper query still holds a connection;
        enough of them at once still exhaust the pool. <strong>Optimization moves the cliff; it does not remove it.</strong>
      </p>

      <H2 id="gate">Step 1 — admission control</H2>
      <p>
        So I stopped letting every heavy read start immediately. A small gate in front of the dashboard reads decides how
        many may run at once and how many may wait. Two details made the difference:
      </p>
      <ul>
        <li>
          <strong>The permit is taken before the transaction opens.</strong> A rejected or waiting request holds no
          database connection, so the queue cannot starve the pool.
        </li>
        <li>
          <strong>The wait budget comes from the client, not from intuition.</strong> The frontend retries only once. A
          short wait would just turn one slow answer into two failures; the wait has to be long enough for a busy moment to
          pass, and short enough to stay under the proxy timeout.
        </li>
      </ul>
      <CodeBlock file="ReadGate.java" code={GATE_CODE} />
      <p>
        When the queue is full the gate answers <code>503</code> with a <code>Retry-After</code> header and its own error
        code, distinct from a real database error — so monitoring and the frontend can tell &ldquo;busy&rdquo; from
        &ldquo;broken&rdquo;.
      </p>

      <H2 id="shared">Step 2 — share identical reads</H2>
      <p>
        Most people open the same default view. Without coordination, five people asking the same question run the same
        expensive query five times. With <em>single-flight</em>, the first request becomes the leader and the others wait
        for its answer.
      </p>
      <CodeBlock file="DashboardReads.java" code={SHARED_CODE} />
      <p>Two things are easy to get wrong here:</p>
      <ul>
        <li>
          <strong>The key.</strong> It must describe the <em>effective</em> request: tags sorted and de-duplicated,
          identifiers normalized, the caller&apos;s scope and role, the reporting date and the data generation. Two bodies
          that mean the same thing must share a key; two that do not must never collide.
        </li>
        <li>
          <strong>A race.</strong> Request B misses the cache and pauses; A finishes, stores its result and leaves; B then
          becomes a new leader and reads the database again. The fix is to re-check the cache after winning the lead — and
          a regression test that forces exactly that ordering and fails if the re-check is removed.
        </li>
      </ul>

      <H2 id="cache">Step 3 — a short, honest cache</H2>
      <p>
        Only after the pool was protected did I add a cache, and I kept it deliberately narrow: an in-process cache with
        a short lifetime and a memory budget, stamped with the warehouse&apos;s data version so a new load invalidates it.
      </p>
      <ul>
        <li>It covers only the default dashboard views, where many people ask the same question.</li>
        <li>
          Paged tables are <strong>never</strong> cached — they carry a version contract (a mismatch answers{" "}
          <code>409</code>), and a cache would break it.
        </li>
        <li>It ships switched off behind a flag and is turned on only after staging checks on memory and correctness.</li>
      </ul>
      <Callout title="Why this order" tone="emerald">
        A cache in front of an unprotected pool still collapses on a cold start — right after the data refreshes, when
        everyone misses at once. Limiting load first means the cache is an optimization, not a life support.
      </Callout>

      <H2 id="measuring">How I tested it</H2>
      <ul>
        <li>
          <strong>A production-sized copy</strong> of the warehouse, rebuilt from real shapes of data, so plans and timings
          behave like production.
        </li>
        <li>
          <strong>The browser&apos;s real request pattern</strong> — the same parallel reads per page and the same retry
          rule — instead of a synthetic benchmark of one endpoint.
        </li>
        <li>
          <strong>Interleaved A/B runs</strong> of the old and new build side by side, because a laptop&apos;s speed drifts
          over minutes and sequential runs lie.
        </li>
        <li>
          <strong>Sameness checks</strong> — every request shape the frontend sends returns identical data with the cache
          off, on, cold and warm; a cache hit runs zero SQL.
        </li>
      </ul>

      <H2 id="rejected">What I rejected</H2>
      <DecisionTable
        head={["Option", "Why not"]}
        rows={[
          ["A very short wait in the gate", "With one client retry, it turned slow pages into error pages."],
          ["Fewer concurrent permits", "Measured slower at every load level I tried."],
          ["Bigger pool or more DB memory", "The database server is shared with the pipeline; the risk lands on someone else."],
          ["Caching everything, including tables", "Breaks the table version contract and hides stale data."],
          ["Prewarming the cache on every refresh", "Adds load at the worst moment; postponed until real data shows it is needed."],
        ]}
      />

      <H2 id="takeaways">Takeaways</H2>
      <ul>
        <li>
          <strong>Failures that arrive together are a capacity problem</strong>, not a query problem.
        </li>
        <li>
          <strong>Protect the scarce resource before speeding up its users</strong> — and take the permit before the
          connection.
        </li>
        <li>
          <strong>Let the client&apos;s retry rule size your wait budget.</strong>
        </li>
        <li>
          <strong>Cache last, narrowly, and keyed by data version</strong> — and prove that cached answers are identical.
        </li>
      </ul>
    </>
  );
}

function BodyVi() {
  return (
    <>
      <H2 id="symptom">Triệu chứng</H2>
      <p>
        Dashboard phân tích tôi phụ trách chậm nhưng vẫn dùng được khi một người mở. Rồi vài người mở cùng một lúc, và tất
        cả đều nhận lỗi. Các request không hỏng lẻ tẻ — chúng hỏng <strong>cùng nhau</strong>, sau một khoảng chờ dài.
      </p>
      <p>
        Kiểu lỗi đó rất đáng chú ý. Lỗi ngẫu nhiên thường là bug. Lỗi đến cùng lúc sau một khoảng chờ thường là một tài
        nguyên dùng chung đã cạn.
      </p>

      <H2 id="why">Vì sao xảy ra</H2>
      <p>Một lần tải dashboard không phải là một request. Frontend gửi song song nhiều lượt đọc nặng — thẻ KPI, P&amp;L, xu hướng, bộ lọc. Mỗi lượt đọc:</p>
      <ol>
        <li>mượn một kết nối từ pool có kích thước cố định,</li>
        <li>giữ kết nối đó suốt câu truy vấn, vốn mất thời gian trên các bảng fact lớn,</li>
        <li>và bỏ cuộc với lỗi <code>503</code> nếu không lấy được kết nối hoặc truy vấn quá thời gian cho phép.</li>
      </ol>
      <p>
        Nhân số lượt đọc mỗi trang với số người mở trang, pool cạn ngay. Tệ hơn, client thử lại một lần sau khi lỗi — nên
        đúng lúc hệ thống quá tải nhất cũng là lúc tải tăng gấp đôi.
      </p>
      <blockquote>Bản thân database không phải điểm nghẽn. Số lượng thứ cùng hỏi nó một lúc mới là điểm nghẽn.</blockquote>

      <H2 id="faster">Truy vấn nhanh hơn là chưa đủ</H2>
      <p>
        Việc đầu tiên tôi làm là việc hiển nhiên: giảm chi phí từng lượt đọc. Tôi gộp hai lần quét bảng P&amp;L thành một,
        thay các phép kiểm tra tồn tại từng dòng bằng phép kiểm tra theo tập, và bỏ tính những ô màn hình không hiển thị.
        Để chắc chắn chỉ tốc độ thay đổi, tôi so từng trường của mọi response mà frontend gọi, trước và sau.
      </p>
      <p>
        Từng request nhanh hơn. Nhưng hình dạng của sự cố không đổi. Một truy vấn rẻ hơn vẫn giữ một kết nối; đủ nhiều truy
        vấn cùng lúc vẫn làm cạn pool. <strong>Tối ưu chỉ dời vách đá đi xa hơn, không xóa được nó.</strong>
      </p>

      <H2 id="gate">Bước 1 — giới hạn tải</H2>
      <p>
        Vì vậy tôi không cho mọi lượt đọc nặng bắt đầu ngay nữa. Một cổng nhỏ đứng trước các lượt đọc dashboard quyết định
        bao nhiêu lượt được chạy cùng lúc và bao nhiêu được chờ. Hai chi tiết tạo nên khác biệt:
      </p>
      <ul>
        <li>
          <strong>Lấy quyền chạy trước khi mở transaction.</strong> Request bị từ chối hoặc đang chờ không giữ kết nối
          database nào, nên hàng đợi không thể làm cạn pool.
        </li>
        <li>
          <strong>Thời gian chờ tính theo client, không theo cảm tính.</strong> Frontend chỉ thử lại một lần. Chờ quá ngắn
          chỉ biến một câu trả lời chậm thành hai lần lỗi; thời gian chờ phải đủ dài để qua lúc cao điểm, và đủ ngắn để
          không vượt timeout của proxy.
        </li>
      </ul>
      <CodeBlock file="ReadGate.java" code={GATE_CODE} />
      <p>
        Khi hàng đợi đầy, cổng trả <code>503</code> kèm header <code>Retry-After</code> và mã lỗi riêng, khác với lỗi
        database thật — để hệ thống giám sát và frontend phân biệt được &ldquo;đang bận&rdquo; với &ldquo;đang hỏng&rdquo;.
      </p>

      <H2 id="shared">Bước 2 — gộp lượt đọc trùng</H2>
      <p>
        Phần lớn mọi người mở cùng một màn hình mặc định. Không có điều phối, năm người hỏi cùng một câu sẽ chạy cùng một
        truy vấn đắt năm lần. Với <em>single-flight</em>, request đầu tiên làm leader, các request còn lại chờ kết quả của
        nó.
      </p>
      <CodeBlock file="DashboardReads.java" code={SHARED_CODE} />
      <p>Có hai chỗ dễ sai:</p>
      <ul>
        <li>
          <strong>Khóa gộp.</strong> Khóa phải mô tả request <em>hiệu lực</em>: tag được sắp xếp và bỏ trùng, định danh được
          chuẩn hóa, phạm vi và vai trò của người gọi, ngày báo cáo và thế hệ dữ liệu. Hai body cùng nghĩa phải chung khóa;
          hai body khác nghĩa tuyệt đối không được trùng.
        </li>
        <li>
          <strong>Race condition.</strong> Request B tra cache trượt rồi tạm dừng; A đọc xong, ghi cache và rời đi; B trở
          thành leader mới và đọc database thêm lần nữa. Cách sửa là tra lại cache sau khi giành được vai leader — kèm một
          regression test ép đúng thứ tự đó và sẽ fail nếu bỏ bước tra lại.
        </li>
      </ul>

      <H2 id="cache">Bước 3 — cache ngắn và trung thực</H2>
      <p>
        Chỉ sau khi pool đã được bảo vệ tôi mới thêm cache, và cố ý giữ nó hẹp: cache trong process, thời gian sống ngắn, có
        giới hạn bộ nhớ, đóng dấu theo phiên bản dữ liệu của kho để lần nạp dữ liệu mới làm cache hết hiệu lực.
      </p>
      <ul>
        <li>Chỉ áp dụng cho các màn hình dashboard mặc định, nơi nhiều người hỏi cùng một câu.</li>
        <li>
          Bảng phân trang <strong>không bao giờ</strong> được cache — chúng có hợp đồng phiên bản (lệch phiên bản trả{" "}
          <code>409</code>), và cache sẽ phá vỡ hợp đồng đó.
        </li>
        <li>Mặc định tắt bằng cờ cấu hình, chỉ bật sau khi kiểm tra bộ nhớ và tính đúng trên staging.</li>
      </ul>
      <Callout title="Vì sao theo thứ tự này" tone="emerald">
        Cache đứng trước một pool không được bảo vệ vẫn sụp khi cache còn trống — ngay sau khi dữ liệu được làm mới, lúc mọi
        người cùng trượt cache. Giới hạn tải trước nghĩa là cache chỉ là phần tối ưu thêm, không phải phao cứu sinh.
      </Callout>

      <H2 id="measuring">Cách tôi kiểm chứng</H2>
      <ul>
        <li>
          <strong>Bản sao dữ liệu cỡ production</strong> dựng lại từ hình dạng dữ liệu thật, để execution plan và thời gian
          chạy giống production.
        </li>
        <li>
          <strong>Đúng cách trình duyệt gửi request</strong> — cùng số lượt đọc song song mỗi trang và cùng quy tắc thử lại
          — thay vì benchmark nhân tạo cho một endpoint.
        </li>
        <li>
          <strong>Chạy A/B xen kẽ</strong> bản cũ và bản mới song song, vì tốc độ của laptop trôi theo từng phút và chạy
          tuần tự sẽ cho kết quả sai.
        </li>
        <li>
          <strong>Kiểm tra kết quả không đổi</strong> — mọi dạng request frontend gửi đều trả cùng dữ liệu khi cache tắt,
          bật, còn trống hay đã ấm; một lần trúng cache chạy 0 câu SQL.
        </li>
      </ul>

      <H2 id="rejected">Những phương án bị loại</H2>
      <DecisionTable
        head={["Phương án", "Vì sao không"]}
        rows={[
          ["Thời gian chờ rất ngắn ở cổng", "Client chỉ thử lại một lần, nên trang chậm biến thành trang lỗi."],
          ["Ít lượt chạy đồng thời hơn", "Đo chậm hơn ở mọi mức tải đã thử."],
          ["Tăng pool hoặc bộ nhớ database", "Máy chủ database dùng chung với pipeline; rủi ro đổ sang người khác."],
          ["Cache mọi thứ, kể cả bảng", "Phá hợp đồng phiên bản của bảng và che giấu dữ liệu cũ."],
          ["Làm ấm cache sau mỗi lần làm mới dữ liệu", "Thêm tải đúng lúc tệ nhất; hoãn đến khi số liệu thật cho thấy cần."],
        ]}
      />

      <H2 id="takeaways">Bài học</H2>
      <ul>
        <li>
          <strong>Lỗi đến cùng lúc là vấn đề năng lực chịu tải</strong>, không phải vấn đề của một câu truy vấn.
        </li>
        <li>
          <strong>Bảo vệ tài nguyên khan hiếm trước khi tăng tốc những thứ dùng nó</strong> — và lấy quyền chạy trước khi
          lấy kết nối.
        </li>
        <li>
          <strong>Để quy tắc thử lại của client quyết định thời gian chờ.</strong>
        </li>
        <li>
          <strong>Cache sau cùng, phạm vi hẹp, gắn với phiên bản dữ liệu</strong> — và chứng minh câu trả lời từ cache giống
          hệt.
        </li>
      </ul>
    </>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const vi = lang === "vi";
  return (
    <div className="glow-card rounded-2xl p-8">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-sky-300/85">
        {vi ? "Bối cảnh của bài viết" : "Where this comes from"}
      </p>
      <Link href={localePath(lang, "/work/command-center")} className="group flex items-start justify-between gap-6">
        <span className="text-xl font-semibold leading-snug text-white transition-colors group-hover:text-sky-200">
          {vi ? "Case study: E-commerce Command Center" : "Case study: E-commerce Command Center"}
        </span>
        <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-sky-300 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

export default function LoadLimitsPostPage({ lang }: { lang: Lang }) {
  const vi = lang === "vi";
  const text = LOAD_LIMITS_POST.text[lang];
  return (
    <ArticleLayout
      eyebrow={vi ? "Bài viết · Backend" : "Writing · Backend"}
      title={text.title}
      lead={text.summary}
      meta={
        <>
          <time dateTime={LOAD_LIMITS_POST.date}>{formatDate(LOAD_LIMITS_POST.date, lang)}</time>
          <span className="text-white/50">/</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {LOAD_LIMITS_POST.readingMinutes} {vi ? "phút đọc" : "min read"}
          </span>
          <span className="text-white/50">/</span>
          <span>Hà Chí Thanh</span>
        </>
      }
      tags={LOAD_LIMITS_POST.tags}
      toc={TOC[lang]}
      backHash="writing"
      footer={<Footer lang={lang} />}
    >
      {vi ? <BodyVi /> : <BodyEn />}
    </ArticleLayout>
  );
}
