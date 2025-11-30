import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const articlesTable = pgTable("articles", {
  id: serial().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  slug: varchar({ length: 255 }).unique().notNull(),
  content: text().notNull(),
  date: timestamp().notNull(),
  author: uuid().references(() => usersTable.id, { onDelete: "set null" }),
});

export const usersTable = pgTable("users", {
  id: uuid().primaryKey(),
  username: varchar({ length: 255 }).notNull(),
  password_bcrypt: varchar({ length: 255 }).notNull(),
  is_admin: boolean().default(false),
});

export const commentsTable = pgTable("comments", {
  id: uuid().primaryKey(),
  sender_id: uuid().references(() => usersTable.id, { onDelete: "cascade" }),
});
