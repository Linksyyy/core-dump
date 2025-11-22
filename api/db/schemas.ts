import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const articlesTable = pgTable("articles", {
  id: serial().primaryKey(),
  title: varchar({ length: 255 }),
  description: varchar({ length: 255 }),
  slug: varchar({ length: 255 }).unique(),
  content: text(),
  date: timestamp(),
});
