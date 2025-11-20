import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx", [
    route("/articles/:articleID", "routes/articles/article.tsx"),
  ]),
] satisfies RouteConfig;
