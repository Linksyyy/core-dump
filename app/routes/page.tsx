import { useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import SpliterAscii from "~/Components/SpliterAscii";
import { useArticles } from "~/globalContext";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Page() {
  const navigate = useNavigate();
  const { articles } = useArticles();
  const [query, setQuery] = useState("");

  const recentArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...articles]
      .sort(
        (first, second) =>
          new Date(second.date).getTime() - new Date(first.date).getTime(),
      )
      .filter((article) => {
        if (!normalizedQuery) return true;

        return [article.title, article.description, article.content].some(
          (field) => field.toLowerCase().includes(normalizedQuery),
        );
      });
  }, [articles, query]);

  return (
    <div className="mx-auto w-full max-w-4xl pb-24 pt-16">
      <section className="mb-14 pb-10 flex-col">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Personal archive
        </p>
        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-scarlet md:text-5xl">
          I keep what I can't quite put away.
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-justify flex leading-7 text-muted">
          Notes, essays, fragments, experiments, and occasional detours. Some
          began as questions, some became arguments, and others never needed to
          become anything at all. A little bit of everything I've been thinking,
          making, reading, questioning, or trying to understand. Not everything
          connects, and not everything is finished. That's part of the point.
        </p>
        <SpliterAscii />
      </section>

      <label className="mb-12 flex items-center gap-3 border-b border-border py-3 focus-within:border-electric">
        <FaSearch className="text-electric" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the archive..."
          className="w-full bg-transparent text-ivory placeholder:text-muted outline-none"
        />
        <span className="font-mono text-xs text-muted">⌘ K</span>
      </label>

      <section>
        <div className="mb-5 flex items-baseline justify-between border-b border-border pb-3">
          <h2 className="font-serif text-2xl text-ivory">Latest articles</h2>
          <span className="font-mono text-xs text-muted">
            {recentArticles.length.toString().padStart(2, "0")}
          </span>
        </div>

        <div>
          {recentArticles.map((article, index) => {
            const date = new Date(article.date);
            const previousDate =
              index > 0 ? new Date(recentArticles[index - 1].date) : null;
            const yearChanged =
              !previousDate ||
              date.getFullYear() !== previousDate.getFullYear();
            const monthChanged =
              yearChanged || date.getMonth() !== previousDate?.getMonth();

            return (
              <div key={article.slug}>
                {yearChanged && (
                  <h3 className="mt-10 border-b border-border pb-2 font-mono text-xs tracking-[0.2em] text-scarlet first:mt-0">
                    {date.getFullYear()}
                  </h3>
                )}
                {monthChanged && (
                  <h4 className="mt-5 font-serif text-lg text-muted">
                    {months[date.getMonth()]}
                  </h4>
                )}
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      date.toLocaleDateString("pt-BR") + "/" + article.slug,
                    )
                  }
                  className="group flex w-full flex-col items-start border-b border-border py-6 text-left transition-colors hover:bg-scarlet/10"
                >
                  <div className="flex w-full items-start justify-between gap-6">
                    <h3 className="font-serif text-xl text-ivory transition-colors group-hover:text-acid">
                      {article.title}
                    </h3>
                    <time className="shrink-0 font-mono text-xs text-muted">
                      {date.toLocaleDateString("en-GB")}
                    </time>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                    {article.description}
                  </p>
                </button>
              </div>
            );
          })}
          {recentArticles.length === 0 && (
            <p className="py-10 text-sm text-muted">No articles found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
