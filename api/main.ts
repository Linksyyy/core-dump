import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import * as db from "./db/queries";

new Elysia()
  .use(cors())
  .get("/articles/:slug", async ({ status, params: { slug } }) => {
    const result = await db.getArticleBySlug(slug);
    if (result === undefined) {
      return status(404, "Not Found");
    }

    return { result };
  })
  .listen(3000);
