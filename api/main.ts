import { Elysia, status } from "elysia";
import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
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
  .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET_STRING!, exp: "30d" }))
  .get("/articles", async () => {
    const articles = await db.getArticles();

    return articles.map((article) => {
      const { id, ...leftover } = article;
      return leftover;
    });
  })
  .get("/articles/:slug", async ({ status, params: { slug } }) => {
    const { id, ...leftover } = await db.getArticleBySlug(slug);

    if (leftover === undefined) return status(404, { result: "Not Found" });

    return leftover;
  })
  .get("/auth", async ({ jwt, status, cookie: { auth } }) => {
    const jwtResult = await jwt.verify(auth.value as string);

    if (jwtResult) return { username: jwtResult.username };
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

    const value = await jwt.sign({ username });

    auth.set({
      value,
      path: "/",
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    });
    return { username };
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
