import type { Route } from "./+types/article";

export default function Article({ params }: Route.LoaderArgs) {
  return <div>{JSON.stringify(params)}</div>;
}
