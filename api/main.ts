import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import * as db from "./db/queries";

const PORT = 3000;

new Elysia()
  .use(cors())
  .get("/articles", async () => {
    const articles = await db.getArticles();

    return articles.map((article) => {
      // just to remove internal id
      const { id, ...leftover } = article;
      return leftover;
    });
  })
  .get("/articles/:slug", async ({ status, params: { slug } }) => {
    const { id, ...leftover } = await db.getArticleBySlug(slug);

    if (leftover === undefined) return status(404, { result: "Not Found" });

    return leftover;
  })
  .listen(PORT);

console.log(`Server initialized\nListening on port: ${PORT}`);
