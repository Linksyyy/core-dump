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
    <div className="px-8 flex md:px-15 xl:px-20">
      <MathJaxContent
        className="Article h-full w-full justify-between overflow-x-hidden"
        html={DOMPurify().sanitize(
          marked.parse(article?.content ?? "", { async: false }),
        )}
      />
    </div>
  );
}
