import { Elysia, status } from "elysia";
import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
import { openapi } from "@elysiajs/openapi";
import * as db from "./db/queries";

interface AuthPayLoad {
  username: string | undefined;
  password: string | undefined;
}

const PORT = 3000;

new Elysia()
  .use(
    cors({
      origin: process.env.PUBLIC_SITE_URL,
      credentials: true,
    })
  )
  .use(openapi())
  .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET_STRING!, exp: "30d" }))
  .post("/auth", async ({ jwt, status, body, cookie: { auth } }) => {
    const { username, password } = body as any;

    if (!username || !password) {
      return status(401, {
        message: "Authetication failed, check username and password",
      });
    }

    const value = await jwt.sign({ username, password });

    auth.set({
      value,
      path: "/",
      secure: false,
      httpOnly: false,
      maxAge: 1000 * 1000 * 60 * 60,
    });
    return { message: `Logged as ${username}` };
  })
  .get("/articles", async () => {
    const articles = await db.getArticles();

    return articles.map((article) => {
      const { id, ...leftover } = article;
      return leftover;
    });
  })
  .get("/articles/:slug", async ({ jwt, status, params: { slug } }) => {
    const { id, ...leftover } = await db.getArticleBySlug(slug);

    if (leftover === undefined) return status(404, { result: "Not Found" });

    return leftover;
  })
  .listen(PORT);

console.log(`Server initialized\nListening on port: ${PORT}`);
