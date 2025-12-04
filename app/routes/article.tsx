import { useEffect } from "react";
import type { Route } from "./+types/article";
import { marked } from "marked";
import { useArticles, type Article } from "~/globalContext";

export const meta = ({ params }: Route.MetaArgs) => [{ title: "Core Dump" }];

export default function Article({ params, loaderData }: Route.ComponentProps) {
  const { articles } = useArticles();
  const article = articles.find((el) => el.slug === params.articleSlug);
  return (
    <div className="Article overflow-y-auto w-full px-10 md:px-30 xl:px-50 text-justify">
      <div
        dangerouslySetInnerHTML={{
          __html: marked.parse(article?.content ?? ""),
        }}
      />
    </div>
  );
}
