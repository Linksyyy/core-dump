import { eq } from "drizzle-orm";
import db from "./db";
import * as schema from "./schemas";
import { aR } from "node_modules/react-router/dist/development/router-CAvh_Drx.mjs";

export const getArticleBySlug = async (slug: string) => {
  const [article] = await db
    .select()
    .from(schema.articlesTable)
    .where(eq(schema.articlesTable.slug, slug))
    .limit(1);

  return article ?? undefined;
};

export const getArticles = async () => {
  const articles = await db.select().from(schema.articlesTable);
  return articles;
};
