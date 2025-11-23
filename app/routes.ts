import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/layout.tsx", [
    index("routes/page.tsx"),
    route("/:day/:month/:year/:articleID", "routes/article.tsx"),
    route("/about", "routes/about.tsx"),
  ]),
] satisfies RouteConfig;
