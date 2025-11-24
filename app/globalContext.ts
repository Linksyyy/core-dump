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

export default create<ArticleStore>((set, get) => ({
  articles: [],
  setArticles: (articlesInput) => set(() => ({ articles: articlesInput })),
}));
