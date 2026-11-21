import { cn } from "@/lib/cn";

/** Section heading with an anchor id (used by the table of contents). */
export function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28">
      <a href={`#${id}`} className="group no-underline">
        {children}
        <span aria-hidden="true" className="ml-2 text-sky-400/0 transition-colors group-hover:text-sky-400/70">
          #
        </span>
      </a>
    </h2>
  );
}

export function Callout({
  title,
  tone = "sky",
  children,
}: {
  title: string;
  tone?: "sky" | "violet" | "emerald" | "amber";
  children: React.ReactNode;
}) {
  const tones = {
    sky: "border-sky-400/30 bg-sky-400/[0.06] text-sky-200",
    violet: "border-violet-400/30 bg-violet-400/[0.06] text-violet-200",
    emerald: "border-emerald-400/30 bg-emerald-400/[0.06] text-emerald-200",
    amber: "border-amber-400/30 bg-amber-400/[0.06] text-amber-200",
  };
  return (
    <aside className={cn("not-prose my-8 rounded-2xl border p-6", tones[tone])}>
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em]">{title}</p>
      <div className="text-[15px] leading-relaxed text-white/80">{children}</div>
    </aside>
  );
}

export function CodeBlock({ file, code }: { file: string; code: string }) {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#07080d]">
      <figcaption className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-white/50">{file}</span>
      </figcaption>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-white/80">
        <code>{code}</code>
      </pre>
    </figure>
  );
}

/** Two- or three-column comparison table; first column is the row header. */
export function DecisionTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <>
      {/* Small screens: one card per row, every column labelled */}
      <div className="not-prose my-8 space-y-3 md:hidden">
        {rows.map((row) => (
          <dl key={row[0]} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <div>
              <dt className="sr-only">{head[0]}</dt>
              <dd className="mb-3 font-semibold text-white">{row[0]}</dd>
            </div>
            {row.slice(1).map((cell, i) => (
              <div key={i} className="mt-3">
                <dt className="mb-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">{head[i + 1]}</dt>
                <dd className="text-sm leading-relaxed text-white/70">{cell}</dd>
              </div>
            ))}
          </dl>
        ))}
      </div>
      <DecisionTableWide head={head} rows={rows} />
    </>
  );
}

function DecisionTableWide({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="not-prose my-8 hidden overflow-x-auto rounded-2xl border border-white/[0.08] md:block">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-white/[0.03]">
            {head.map((h) => (
              <th key={h} scope="col" className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-t border-white/[0.06] align-top">
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="px-5 py-4 font-semibold text-white">
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="px-5 py-4 leading-relaxed text-white/70">
                    {cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
