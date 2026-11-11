import type { Route } from "./+types/article";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useArticles, type Article } from "~/globalContext";
import MathJaxContent from "~/Components/MathJaxContent";

export const meta = ({ params }: Route.MetaArgs) => [
  { title: params.articleSlug.replace("-", " ") },
];

export default function Article({ params }: Route.ComponentProps) {
  const { articles } = useArticles();
  const article = articles.find((el) => el.slug === params.articleSlug);
  return (
    <div className="font-serif text-ivory max-w-3xl w-full mx-auto pt-14 pb-28">
      <MathJaxContent
        className="Article h-full w-full justify-between overflow-x-hidden"
        html={DOMPurify().sanitize(
          marked.parse(article?.content ?? "", { async: false }),
        )}
      />
    </div>
  );
}
