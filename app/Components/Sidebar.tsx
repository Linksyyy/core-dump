import { useNavigate } from "react-router";
import { useArticles } from "~/globalContext";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { articles } = useArticles();

  return (
    <div className="flex flex-col w-1/5 h-full overflow-y-auto border-l border-neutral-300 px-5 pt-14">
      <div className="flex flex-col-reverse">
        {articles.map((article, index, articles) => {
          const previousYear =
            index > 0
              ? new Date(articles[index - 1].date).getFullYear()
              : undefined;
          const currentYear = new Date(article.date).getFullYear();

          return (
            <div key={index} className="flex w-full flex-col">
              {(index === articles.length - 1 ||
                (index > 0 && currentYear != previousYear!)) && (
                <h2 className="flex w-full justify-center text-neutral-600 font-extrabold text-xl">
                  {currentYear}
                </h2>
              )}
              <button
                onClick={() =>
                  navigate(
                    new Date(article.date).toLocaleDateString("pt-BR") +
                      "/" +
                      article.slug
                  )
                }
                className="border-y border-neutral-300 hover:bg-neutral-200 hover:cursor-pointer transform transition ease-out duration-200 flex flex-col items-start w-full"
              >
                <div className="flex w-full justify-between">
                  <h3 className="font-bold text-lg">{article.title}</h3>
                  <p className="text-neutral-600 text-xs">
                    {new Date(article.date).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <p className="text-neutral-600 text-xs">
                  {article.description}
                </p>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
