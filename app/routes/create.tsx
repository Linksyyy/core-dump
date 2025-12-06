import { useState } from "react";
import type { Route } from "../+types/root";
import { marked } from "marked";
import { MdOutlineDone } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { useArticles } from "~/globalContext";

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const articles = useArticles();

  async function handleSubmit() {
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        content,
      }),
    });
    const digested = await res.json();

    if (res.ok) {
      setTitle("");
      setDescription("");
      setContent("");

      articles.setArticles([...articles.articles, digested.article]);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col gap-y-10 w-full"
    >
      <hr className="text-neutral-400 mt-5" />
      <div className="w-full h-full grid grid-cols-2 gap-4">
        <textarea
          placeholder="Escreva aqui..."
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-full justify-between outline-none border border-dashed border-neutral-500 wrap-break-word p-4"
        />
        <div
          className="Article h-full w-full justify-between overflow-x-hidden p-4"
          dangerouslySetInnerHTML={{
            __html: marked.parse(content ?? ""),
          }}
        ></div>
      </div>
      <hr className="text-neutral-400 mb-50" />
      <div className="absolute bottom-0 w-6/10 border border-neutral-400 bg-neutral-300/50 backdrop-blur-sm mb-10 h-20 rounded-3xl p-3 flex items-center justify-between gap-5 mx-10">
        <div className="flex w-full gap-10">
          <input
            type="text"
            required
            placeholder="Insira o título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-neutral-300/30 px-3 py-1 rounded-3xl outline-none border border-neutral-500 focus:border-black focus:bg-neutral-400/30"
          />
          <input
            type="text"
            required
            placeholder="Insira a descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-neutral-300/30 px-3 py-1 rounded-3xl outline-none border border-neutral-500 focus:border-black focus:bg-neutral-400/30"
          />
        </div>
        <div className="flex gap-10 w-full justify-end">
          <button
            onClick={async () => {
              const delay = (ms: number) =>
                new Promise((res) => setTimeout(res, ms));
              let currentContent = content;

              while (currentContent.length > 0) {
                const newText = currentContent.slice(0, -50);
                setContent(newText);
                currentContent = newText;
                await delay(1);
              }
              setContent("");
            }}
            type="reset"
            className="flex justify-center items-center bg-red-500/60 rounded-full border hover:bg-red-700/90 focus:bg-red-700/90 cursor-pointer"
          >
            <FaRegTrashCan className="size-11 p-3" />
          </button>
          <button
            type="submit"
            className="flex justify-center items-center bg-green-500/60 rounded-full border hover:bg-green-700/90 focus:bg-green-700/90 cursor-pointer"
          >
            <MdOutlineDone className="size-11 p-3" />
          </button>
        </div>
      </div>
    </form>
  );
}
