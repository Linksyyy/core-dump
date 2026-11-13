import type { Route } from "./+types/article";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useArticles, useUserSession, type Article } from "~/globalContext";
import MathJaxContent from "~/Components/MathJaxContent";
import AsciiBackdrop from "~/Components/AsciiBackdrop";
import { Link } from "react-router";
import { useEffect, useState } from "react";

export const meta = ({ params }: Route.MetaArgs) => [
  { title: params.articleSlug.replace("-", " ") },
];

export default function Article({ params }: Route.ComponentProps) {
  const cachedArticle = useArticles((state) =>
    state.articles.find((el) => el.slug === params.articleSlug),
  );
  const upsertArticle = useArticles((state) => state.upsertArticle);
  const userSession = useUserSession();
  const [article, setArticle] = useState<Article | undefined>(cachedArticle);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedArticle) {
      setArticle(cachedArticle);
      return;
    }

    let active = true;

    fetch(`/api/articles/${encodeURIComponent(params.articleSlug)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error("Article not found");
        return (await response.json()) as Article;
      })
      .then((fetchedArticle) => {
        if (!active) return;
        setArticle(fetchedArticle);
        upsertArticle(fetchedArticle);
      })
      .catch(() => {
        if (active) setError("Unable to load this article.");
      });

    return () => {
      active = false;
    };
  }, [cachedArticle, params.articleSlug, upsertArticle]);

  return (
    <div className="font-serif text-ivory max-w-3xl w-full mx-auto pt-14 pb-28">
      <AsciiBackdrop />
      {userSession.isAdmin && article && (
        <div className="mb-6 flex justify-end">
          <Link
            to={`/edit/${article.slug}`}
            className="border border-acid px-4 py-2 font-mono text-sm text-acid transition-colors hover:bg-acid hover:text-void"
          >
            Edit article
          </Link>
        </div>
      )}
      {error ? (
        <p className="text-muted">{error}</p>
      ) : article ? (
        <MathJaxContent
          className="Article h-full w-full justify-between overflow-x-hidden"
          html={DOMPurify().sanitize(
            marked.parse(article.content, { async: false }),
          )}
        />
      ) : (
        <p className="text-muted">Loading article...</p>
      )}
    </div>
  );
}
