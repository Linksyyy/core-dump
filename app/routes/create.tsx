import { useState } from "react";
import type { Route } from "../+types/root";
import { marked } from "marked";

const API_URL = process.env.API_URL;

export async function loader({ request: { headers } }: Route.LoaderArgs) {
  const Cookie = headers.get("Cookie")!;
  const response = await fetch(`${API_URL}/auth`, {
    headers: {
      "Content-Type": "application/json",
      Cookie,
    },
  });
  const digested = await response.json();
  if (!response.ok || !digested.isAdmin) throw 42; // this will block acess to route, 42 dont mean nothing, i just need throw something
}

export default function Create() {
  const [content, setContent] = useState("");

  return (
    <div className="w-full h-full grid grid-cols-2 gap-4">
      <textarea
        placeholder="Escreva aqui..."
        onChange={(e) => setContent(e.target.value)}
        className="h-full w-full justify-between outline-none border border-dashed border-neutral-500 overflow-hidden"
      />
      <div
        className="Article h-full w-full justify-between"
        dangerouslySetInnerHTML={{
          __html: marked.parse(content ?? ""),
        }}
      ></div>
    </div>
  );
}
