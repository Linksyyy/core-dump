import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import Header from "~/Components/Header";
import Sidebar from "~/Components/Sidebar";
import useArticles, { type Article } from "~/globalContext";
import { useEffect } from "react";

export const meta = ({}: Route.MetaArgs) => [{ title: "Core dump" }];

export async function loader() {
  const apiUrl = process.env.API_URL;
  const response = fetch(`${apiUrl}/articles`, {
    credentials: "include",
  });
  return await response;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const articles = useArticles();

  const formatedArticles = (loaderData as Article[]).map(
    (article: Article) => ({
      ...article,
      date: new Date(article.date),
    })
  );

  useEffect(() => {
    articles.setArticles(formatedArticles);
  }, []);

  return (
    <div className="fixed inset-0">
      <Header />
      <div className="flex justify-between h-screen">
        <main className="flex-1 overflow-y-auto">
          <div className="h-14 shrink-0" />
          
          <Outlet />
        </main>
        <Sidebar />
      </div>
    </div>
  );
}
