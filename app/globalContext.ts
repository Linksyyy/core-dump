import { create } from "zustand";

export type Article = {
  title: string;
  description: string;
  slug: string;
  content: string;
  date: Date;
  author: string;
};

export type ArticleStore = {
  articles: Article[];
  setArticles: (articlesInput: Article[]) => void;
};

export type UserSessionStore = {
  isLoggedIn: boolean;
  username: string;
  setAuthState: (username: string) => void;
};

export const useArticles = create<ArticleStore>((set, get) => ({
  articles: [],
  setArticles: (articlesInput) => set(() => ({ articles: articlesInput })),
}));

export const useUserSession = create<UserSessionStore>((set) => ({
  isLoggedIn: false,
  username: "",
  setAuthState: (username: string) =>
    set(() => ({ isLoggedIn: true, username: username })),
}));
