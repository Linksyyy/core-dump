import { useNavigate } from "react-router";

const date = new Date();
let articles: { title: string; desc: string; date: string; slug: string }[] = [];
for (let i = 1; i <= 100; i++) {
  articles.push({
    title: "blah blah " + i,
    desc: "tal e tal e tal e tal e tal",
    date: date.toLocaleDateString("pt-BR"),
    slug: "lorem-ipsum",
  });
}

export default function Sidebar() {
  const navigate = useNavigate();
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
            <p className="text-neutral-600 text-xs">{article.date}</p>
          </div>
          <p className="text-neutral-600 text-xs">{article.desc}</p>
        </button>
      ))}
    </div>
  );
}
