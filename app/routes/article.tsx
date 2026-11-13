import type { Route } from "./+types/article";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useArticles, useUserSession } from "~/globalContext";
import MathJaxContent from "~/Components/MathJaxContent";
import AsciiBackdrop from "~/Components/AsciiBackdrop";
import { Link } from "react-router";

export const meta = ({ params }: Route.MetaArgs) => [
  { title: params.articleSlug.replace("-", " ") },
];

export default function Article({ params }: Route.ComponentProps) {
  const { articles } = useArticles();
  const userSession = useUserSession();
  const article = articles.find((el) => el.slug === params.articleSlug);
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
      <MathJaxContent
        className="Article h-full w-full justify-between overflow-x-hidden"
        html={DOMPurify().sanitize(
          marked.parse(article?.content ?? "", { async: false }),
        )}
      />
    </div>
  );
}
