import type { Route } from "../+types/home";

export default function Article({ params }: Route.LoaderArgs) {
  return <div>{params.articleID}</div>;
}
