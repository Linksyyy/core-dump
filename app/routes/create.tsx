import { useState } from "react";
import type { Route } from "../+types/root";
import { marked } from "marked";
import { MdOutlineDone } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

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
    <div className="flex flex-col gap-y-10 w-full">
      <div className="w-full h-full grid grid-cols-2 gap-4">
        <textarea
          placeholder="Escreva aqui..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-full justify-between outline-none border border-dashed border-neutral-500 wrap-break-word p-4"
        />
        <div
          className="Article h-full w-full justify-between overflow-x-hidden wrap-break-word text-justify hyphens-auto p-4"
          dangerouslySetInnerHTML={{
            __html: marked.parse(content ?? ""),
          }}
        ></div>
      </div>
      <hr className="text-neutral-400" />
      <div className="w-full bg-neutral-300 mb-10 h-20 rounded-3xl p-3 flex items-center justify-end gap-5">
        <button
          onClick={async () => {
            const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
            let currentContent = content;

            while(currentContent.length > 0) {
              setContent(currentContent.slice(0, -100))
              currentContent = currentContent.slice(0, -100)
              await delay(1)
            }
            setContent("")
          }}
          className="flex justify-center items-center bg-red-500 rounded-full border hover:bg-red-700 cursor-pointer"
        >
          <FaRegTrashCan className="size-11 p-3" />
        </button>
        <button className="flex justify-center items-center bg-green-500 rounded-full border hover:bg-green-700 cursor-pointer">
          <MdOutlineDone className="size-11 p-3" />
        </button>
      </div>
    </div>
  );
}
