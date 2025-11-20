import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/articles", "routes/articles/home.tsx", [
    route("/articles/:articleID", "routes/articles/article.tsx"),
  ]),
] satisfies RouteConfig;