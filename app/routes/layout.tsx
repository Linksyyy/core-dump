import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import Header from "~/Components/Header";
import Sidebar from "~/Components/Sidebar";
import { useArticles, useUserSession, type Article } from "~/globalContext";
import { useEffect, useState } from "react";
import Login from "~/Components/LoginModal";
import Register from "~/Components/RegisterModal";

const API_URL = process.env.API_URL!;

export const meta = ({}: Route.MetaArgs) => [{ title: "Core dump" }];

export async function loader() {
  const response = await fetch(`${API_URL}/articles`, {
    credentials: "include",
  }).then((res) => res.json());

  return { articlesResponse: response };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { articlesResponse } = loaderData;
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const articles = useArticles();
  const userSession = useUserSession();

  const formatedArticles = (articlesResponse as Article[]).map(
    (article: Article) => ({
      ...article,
      date: new Date(article.date),
    })
  );

  async function handleLogin() {
    const res = await fetch("/api/auth");
    const digested = await res.json();

    if (res.ok) userSession.setAuthState(digested.username);
  }

  useEffect(() => {
    articles.setArticles(formatedArticles);
    handleLogin();
  }, []);

  return (
    <div className="fixed inset-0">
      {loginVisible && <Login toggleVisible={() => setLoginVisible(false)} />}
      {registerVisible && (
        <Register toggleVisible={() => setRegisterVisible(false)} />
      )}

      <Header
        onLoginClick={() => setLoginVisible(true)}
        onRegisterClick={() => setRegisterVisible(true)}
      />
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
