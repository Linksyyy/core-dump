import type { Route } from "./+types/article";
import { marked } from "marked";

export const meta = ({}: Route.MetaArgs) => [{ title: "Core dump" }];


const bah: any = await (
  await fetch("http://localhost:3000/articles/first-test")
).json();


export default function Article({ params }: Route.LoaderArgs) {
  return (
    <div className="Article overflow-y-auto w-full px-50 text-justify">
      <div
        dangerouslySetInnerHTML={{
          __html: marked.parse(bah.result.content),
        }}
      />
    </div>
  );
}
