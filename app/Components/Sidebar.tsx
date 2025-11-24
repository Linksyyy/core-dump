import { useNavigate } from "react-router";
import type { Route } from "../+types/root";
import useArticles from "~/globalContext";
import Article from "~/routes/article";

export default function Sidebar() {
  const navigate = useNavigate();
  const { articles } = useArticles();

  return (
    <div className="flex flex-col w-1/5 h-full overflow-y-auto border-l border-neutral-300 px-5 pt-14 ">
      {articles.map((article, index) => (
        <button
          key={index}
          onClick={() => navigate(article.date + "/" + article.slug)}
          className="border-y border-neutral-300 hover:bg-neutral-200 hover:cursor-pointer transform transition ease-out duration-200 flex flex-col items-start"
        >
          <div className="flex w-full justify-between">
            <h3 className="font-bold text-lg">{article.title}</h3>
            <p className="text-neutral-600 text-xs">
              {article.date.toLocaleDateString("pt-BR")}
            </p>
          </div>
          <p className="text-neutral-600 text-xs">{article.description}</p>
        </button>
      ))}
    </div>
  );
}
