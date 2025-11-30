import { eq } from "drizzle-orm";
import db from "./db";
import * as schemas from "./schemas";
import { v7 as generateRandomUUIDV7 } from "uuid";

export const getArticleBySlug = async (slug: string) => {
  const [article] = await db
    .select()
    .from(schemas.articlesTable)
    .where(eq(schemas.articlesTable.slug, slug))
    .limit(1);

  return article ?? undefined;
};

export const getArticles = async () => {
  const articles = await db.select().from(schemas.articlesTable);
  return articles;
};

export async function getUserByUsername(username: string) {
  return await db
    .select()
    .from(schemas.usersTable)
    .where(eq(schemas.usersTable.username, username))
    .then((res) => res[0]);
}

export async function createUser(username: string, password_bcrypt: string) {
  return db
    .insert(schemas.usersTable)
    .values({
      id: generateRandomUUIDV7(),
      username,
      password_bcrypt,
      is_admin: false,
    });
}
