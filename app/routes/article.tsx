import type { Route } from "./+types/article";
import { marked } from "marked";

export const meta = ({}: Route.MetaArgs) => [{ title: "Core dump" }];

export async function loader({ params }: Route.LoaderArgs) {
  const apiUrl = process.env.API_URL;
  const response = await fetch(`${apiUrl}/articles/first-slug`);
  const data = await response.json();
  return data;
}

export default function Article({ params, loaderData }: Route.ComponentProps) {
  return (
    <div className="Article overflow-y-auto w-full px-50 text-justify">
      <div
        dangerouslySetInnerHTML={{
          __html: marked.parse(loaderData.content ?? ""),
        }}
      />
    </div>
  );
}
