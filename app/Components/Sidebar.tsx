import { useLocation, useNavigate } from "react-router";
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
  const location = useLocation();
  const { articles } = useArticles();
  const orderedArticles = [...articles].reverse();

  return (
    <aside className="flex flex-col w-1/5 h-full overflow-y-auto border-l border-border bg-charcoal/70 pt-20">
      <h2 className="font-serif text-ivory tracking-wide mb-5 text-lg">
        Archive
      </h2>
      <div>
        {orderedArticles.map((article, index) => {
          const previousYear =
            index > 0
              ? new Date(orderedArticles[index - 1].date).getFullYear()
              : undefined;
          const currentYear = new Date(article.date).getFullYear();
          const isSelected = location.pathname.endsWith(`/${article.slug}`);

          return (
            <div key={index} className="flex w-full flex-col">
              {(index === 0 || currentYear !== previousYear) && (
                <h2 className="font-serif flex w-full justify-center border-b border-border text-muted tracking-widest pb-2 mb-1 text-sm font-bold">
                  {currentYear}
                </h2>
              )}
              <button
                onClick={() =>
                  navigate(
                    new Date(article.date).toLocaleDateString("pt-BR") +
                      "/" +
                      article.slug,
                  )
                }
                className={`group relative font-serif border-border hover:bg-gradient-to-r hover:from-scarlet/20 hover:to-transparent hover:cursor-pointer transform transition ease-out duration-200 flex flex-col items-start w-full py-3 ${
                  isSelected ? "bg-gradient-to-r from-scarlet/20 to-transparent" : ""
                }`}
              >
                <div
                  className={`absolute left-0 top-0 h-full w-1 transition-colors ${
                    isSelected
                      ? "bg-scarlet"
                      : "bg-transparent group-hover:bg-scarlet"
                  }`}
                />
                <div className="relative flex w-full pl-4">
                  <div className="flex w-full flex-col">
                    <div className="flex w-full justify-between">
                      <h3 className="text-left tracking-[-0.02em] font-bold text-lg">
                        {article.title}
                      </h3>
                      <p className="font-mono text-muted text-xs">
                        {new Date(article.date).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <p className="text-left text-muted text-xs leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
