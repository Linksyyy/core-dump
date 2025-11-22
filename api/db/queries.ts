import { eq } from "drizzle-orm";
import { db } from "./db";
import * as schema from "./schemas";

export const getArticleBySlug = async (slug: string) => {
  const [article] = await db
    .select()
    .from(schema.articlesTable)
    .where(eq(schema.articlesTable.slug, slug))
    .limit(1);

  return article ?? undefined;
};
