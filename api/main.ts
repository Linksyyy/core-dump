import { Elysia, status, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { jwt, type JWTPayloadSpec } from "@elysiajs/jwt";
import { openapi } from "@elysiajs/openapi";
import * as db from "./db/queries";
import bcrypt from "bcrypt";

// THESE ROUTES >>DONT<< HAVE PROTECTION, DONT PUT IT ON PROD

const PORT = 3000;
const saltRounds = 10;

new Elysia()
  .use(
    cors({
      origin: process.env.PUBLIC_SITE_URL,
      credentials: true,
    })
  )
  .use(openapi())
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET_STRING!,
      exp: "30d",
      schema: t.Object({
        id: t.String(),
        username: t.String(),
        isAdmin: t.Boolean(),
      }),
    })
  )
  .get("/articles", async () => {
    const articles = await db.getArticles();

    return articles.map((article) => {
      const { id, ...leftover } = article;
      return leftover;
    });
  })
  .post(
    "/articles",
    async ({ jwt, cookie: { auth }, status, body }) => {
      const jwtPayload = await jwt.verify(auth.value as string);

      let { title, description, content } = body;
      [title, description, content] = [
        title.trim(),
        description.trim(),
        content.trim(),
      ];

      if (!jwtPayload) return status(400, { message: "Need to be logged in" });
      if (!jwtPayload.isAdmin)
        return status(401, { message: "Need to be admin to send an article" });
      if (!title || !description || !content)
        return status(400, {
          message:
            "Parameters 'title', 'description' and 'content' must be defined",
        });

      try {
        const date = new Date();
        const article = await db.createArticle(
          title,
          description,
          content,
          date,
          jwtPayload.id
        );
        const { id, ...leftover } = article;
        return { article: leftover };
      } catch (e) {
        return status(500, { message: "Something is wrong here" });
      }
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.String(),
        content: t.String(),
      }),
    }
  )
  .get("/articles/:slug", async ({ status, params: { slug } }) => {
    const { id, ...leftover } = await db.getArticleBySlug(slug);

    if (leftover === undefined) return status(404, { result: "Not Found" });

    return leftover;
  })
  .get("/auth", async ({ jwt, status, cookie: { auth } }) => {
    const { username, isAdmin } = (await jwt.verify(
      auth.value as string
    )) as any;

    if (username) return { username, isAdmin };
    else return status(406, { message: "Invalid token" });
  })
  .post("/auth/signin", async ({ jwt, status, body, cookie: { auth } }) => {
    let { username, password } = body as any;
    [username, password] = [username.trim(), password.trim()];

    if (!username || !password) {
      return status(401, {
        message: "Authetication failed, check username and password",
      });
    }

    const user = await db.getUserByUsername(username);

    if (!user) {
      return status(406, { message: "This user don't exists" });
    }

    if (!(await bcrypt.compare(password, user.password_bcrypt))) {
      return status(401, { message: "Wrong password" });
    }
    const payload = { id: user.id, username, isAdmin: user.is_admin! };
    const value = await jwt.sign(payload);

    auth.set({
      value,
      path: "/",
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    });
    return payload;
  })
  .post("/auth/signup", async ({ status, body, cookie: { auth } }) => {
    let { username = "", password = "" } = body as any;
    [username as string, password as string] = [
      username.trim(),
      password.trim(),
    ];

    if (!username || !password) {
      return status(401, {
        message: "Authetication failed, check username and password",
      });
    }

    if (password.length < 8) {
      return status(406, { message: "Password length can't bem lower than 8" });
    }

    if (await db.getUserByUsername(username)) {
      return status(406, { message: "This user already exists" });
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return status(500, { message: "Server error (probably)" });
      db.createUser(username, hash);
    });
    return { message: "Sign up sucessfully" };
  })
  .listen(PORT);

console.log(`Server initialized\nListening on port: ${PORT}`);
