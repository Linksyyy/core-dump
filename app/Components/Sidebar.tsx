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
    <aside className="flex flex-col w-1/5 h-full overflow-y-auto border-l border-slate-300 bg-slate-200/45 px-5 pt-20">
      <h2 className="font-serif text-neutral-900 tracking-wide mb-5 text-lg">Arquivo</h2>
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
                <h2 className="font-serif flex w-full justify-center border-b border-neutral-300 text-neutral-600 tracking-widest pb-2 mb-1 text-sm font-bold">
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
                className="font-serif border-slate-300 hover:bg-white/80 hover:cursor-pointer transform transition ease-out duration-200 flex flex-col items-start w-full py-3"
              >
                <div className="flex w-full justify-between">
                  <h3 className="tracking-[-0.02em] font-bold text-lg">{article.title}</h3>
                  <p className="text-neutral-600 text-xs">
                    {new Date(article.date).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  {article.description}
                </p>
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
