import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/layout.tsx", [
    index("routes/page.tsx"),
    route("/:year/:month/:day/:articleID", "routes/articles/article.tsx")
  ]),
] satisfies RouteConfig;
