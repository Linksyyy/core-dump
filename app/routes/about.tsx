const mainStack = [
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "Node.js",
  "Next.js",
  "Deno",
  "Bun",
  "Python",
  "React",
  "Tailwind",
  "Postgres",
  "C",
  "C++",
  "Java",
  "Rust",
];

const tools = ["Arch", "Git", "Neovim", "VS Code"];

export default function About() {
  return (
    <div className="mx-auto w-full max-w-4xl pb-24 pt-16">
      <header className="border-b border-border pb-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          About me
        </p>
        <h1 className="mt-4 font-serif text-5xl font-semibold tracking-tight text-scarlet">
          Adriel <span className="text-acid">♜</span>
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-xl leading-8 text-ivory">
          Computer Science @ UFS · Aspiring software engineer · Chaos Architect
        </p>
        <a
          href="https://github.com/Linksyyy"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block font-mono text-xs text-violet hover:text-acid hover:underline"
        >
          github.com/Linksyyy ↗
        </a>
      </header>

      <section className="grid gap-12 border-b border-border py-12 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Profile
          </p>
        </div>
        <div className="space-y-5 text-sm leading-7 text-muted">
          <p>
            Computer Science student at UFS, based in Brazil, interested in
            understanding how software works beneath the surface.
          </p>
          <p>
            I am obsessive about performance, clean architecture and low-level
            thinking. Most of the time, I am tweaking, profiling and
            over-optimizing things simply because it is fun.
          </p>
        </div>
      </section>

      <section className="grid gap-12 border-b border-border py-12 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Main stack
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {mainStack.map((technology) => (
            <span
              key={technology}
              className="border border-border bg-charcoal px-3 py-2 font-mono text-xs text-acid"
            >
              {technology}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-12 py-12 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Tools
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span
              key={tool}
              className="border border-border px-3 py-2 font-mono text-xs text-muted"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
