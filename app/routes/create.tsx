import { useEffect, useRef, useState } from "react";
import type { Route } from "./+types/create";
import { marked } from "marked";
import { MdOutlineDone } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { useArticles } from "~/globalContext";
import MathJaxContent from "~/Components/MathJaxContent";
import { useNavigate } from "react-router";

const API_URL = process.env.API_URL;

type DeferredRange = {
  start: number;
  end: number;
};

function getDeferredRange(lines: string[], activeLine: number): DeferredRange | null {
  let start = -1;
  let delimiter = "";

  for (let index = 0; index < lines.length; index += 1) {
    const trimmedLine = lines[index].trim();

    if (start === -1) {
      if (trimmedLine.startsWith("```")) {
        start = index;
        delimiter = "```";
      } else if (trimmedLine === "$$" || trimmedLine === "\\[") {
        start = index;
        delimiter = trimmedLine;
      }
      continue;
    }

    const closesBlock =
      (delimiter === "```" && trimmedLine.startsWith("```")) ||
      (delimiter === "$$" && trimmedLine === "$$") ||
      (delimiter === "\\[" && trimmedLine === "\\]");

    if (closesBlock) {
      if (activeLine >= start && activeLine <= index) {
        return { start, end: index };
      }
      start = -1;
      delimiter = "";
    }
  }

  return start !== -1 && activeLine >= start
    ? { start, end: lines.length - 1 }
    : null;
}

export async function loader({
  request: { headers },
  params,
}: Route.LoaderArgs) {
  const Cookie = headers.get("Cookie")!;
  const authResponse = await fetch(`${API_URL}/auth`, {
    headers: {
      "Content-Type": "application/json",
      Cookie,
    },
  });
  const auth = await authResponse.json();
  if (!authResponse.ok || !auth.isAdmin) throw 42;

  if (!params.articleSlug) return { article: null };

  const articleResponse = await fetch(
    `${API_URL}/articles/${params.articleSlug}`,
  );
  if (!articleResponse.ok) throw new Response("Article not found", { status: 404 });

  return { article: await articleResponse.json() };
}

export default function Create({ loaderData, params }: Route.ComponentProps) {
  const isEditing = Boolean(params.articleSlug);
  const [content, setContent] = useState(loaderData?.article?.content ?? "");
  const [title, setTitle] = useState(loaderData?.article?.title ?? "");
  const [description, setDescription] = useState(
    loaderData?.article?.description ?? "",
  );
  const [activeLine, setActiveLine] = useState(0);
  const [allSelected, setAllSelected] = useState(false);
  const [rawMode, setRawMode] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const selectAllRef = useRef(false);
  const navigate = useNavigate();

  const articles = useArticles();
  const lines = content.split("\n");
  const currentLine = lines[activeLine] ?? "";
  const deferredRange = getDeferredRange(lines, activeLine);
  const beforeEnd = deferredRange?.start ?? activeLine;
  const afterStart = deferredRange ? deferredRange.end + 1 : activeLine + 1;
  const before = lines.slice(0, beforeEnd).join("\n");
  const deferredBefore = deferredRange
    ? lines.slice(deferredRange.start, activeLine).join("\n")
    : "";
  const deferredAfter = deferredRange
    ? lines.slice(activeLine + 1, deferredRange.end + 1).join("\n")
    : "";
  const after = lines.slice(afterStart).join("\n");

  useEffect(() => {
    editorRef.current?.focus();
  }, [activeLine]);

  function updateCurrentLine(value: string) {
    setAllSelected(false);
    const nextLines = [...lines];
    nextLines[activeLine] = value;
    setContent(nextLines.join("\n"));
  }

  function moveToLine(line: number, cursorPosition = 0) {
    setAllSelected(false);
    setActiveLine(line);
    requestAnimationFrame(() => {
      if (!editorRef.current) return;
      editorRef.current.focus();
      editorRef.current.setSelectionRange(cursorPosition, cursorPosition);
    });
  }

  function handleEditorKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    const editor = event.currentTarget;
    const cursor = editor.selectionStart;

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a") {
      event.preventDefault();
      selectAllRef.current = true;
      setAllSelected(true);
      editor.select();
      return;
    }

    if (selectAllRef.current && (event.key === "Backspace" || event.key === "Delete")) {
      event.preventDefault();
      selectAllRef.current = false;
      setAllSelected(false);
      setContent("");
      setActiveLine(0);
      return;
    }

    if (selectAllRef.current && event.key === "Enter") {
      event.preventDefault();
      selectAllRef.current = false;
      setAllSelected(false);
      setContent("\n");
      setActiveLine(0);
      return;
    }

    if (event.key === "Escape") {
      selectAllRef.current = false;
      setAllSelected(false);
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const nextLines = [...lines];
      nextLines.splice(activeLine, 1, currentLine.slice(0, cursor), currentLine.slice(cursor));
      setContent(nextLines.join("\n"));
      moveToLine(activeLine + 1);
      return;
    }

    if (event.key === "Backspace" && cursor === 0 && activeLine > 0) {
      event.preventDefault();
      const previousLine = lines[activeLine - 1] + currentLine;
      const nextLines = [...lines];
      nextLines.splice(activeLine - 1, 2, previousLine);
      setContent(nextLines.join("\n"));
      moveToLine(activeLine - 1, lines[activeLine - 1].length);
      return;
    }

    if (
      event.key === "ArrowUp" &&
      cursor === 0 &&
      activeLine > 0
    ) {
      event.preventDefault();
      moveToLine(activeLine - 1, lines[activeLine - 1].length);
    }

    if (
      event.key === "ArrowDown" &&
      cursor === currentLine.length &&
      activeLine < lines.length - 1
    ) {
      event.preventDefault();
      moveToLine(activeLine + 1);
    }
  }

  async function handleSubmit() {
    const res = await fetch(
      isEditing ? `/api/articles/${params.articleSlug}` : "/api/articles",
      {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          content,
        }),
      },
    );
    const digested = await res.json();

    if (res.ok) {
      if (isEditing) {
        articles.setArticles(
          articles.articles.map((article) =>
            article.slug === params.articleSlug ? digested.article : article,
          ),
        );
        navigate(
          `/${new Date(digested.article.date).toLocaleDateString("pt-BR")}/${digested.article.slug}`,
        );
      } else {
        setTitle("");
        setDescription("");
        setContent("");
        articles.setArticles([...articles.articles, digested.article]);
      }
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
      <hr className="border-border mt-5" />
      {rawMode ? (
        <textarea
          placeholder="Escreva aqui..."
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[65vh] w-full resize-none overflow-y-auto border border-border bg-charcoal p-4 font-mono text-ivory caret-acid placeholder:text-muted outline-none"
        />
      ) : (
        <div
          className={`min-h-[65vh] w-full overflow-y-auto border border-border bg-charcoal ${
            allSelected ? "bg-acid/10" : ""
          }`}
        >
          {before && (
            <MathJaxContent
              className={`Article w-full px-4 pt-4 ${
                allSelected ? "bg-acid/20" : ""
              }`}
              html={marked.parse(before, { async: false, breaks: true })}
            />
          )}
          {deferredBefore && (
            <pre
              className={`whitespace-pre-wrap px-4 font-mono text-ivory ${
                allSelected ? "bg-acid/20" : ""
              }`}
            >
              {deferredBefore}
            </pre>
          )}
          <textarea
            ref={editorRef}
            placeholder="Escreva aqui..."
            required
            rows={1}
            value={currentLine}
            onChange={(e) => updateCurrentLine(e.target.value)}
            onInput={(e) => {
              if (!selectAllRef.current) return;
              selectAllRef.current = false;
              setAllSelected(false);
              setContent(e.currentTarget.value);
              setActiveLine(0);
            }}
            onCopy={(event) => {
              if (!selectAllRef.current) return;
              event.preventDefault();
              void navigator.clipboard.writeText(content);
            }}
            onCut={(event) => {
              if (!selectAllRef.current) return;
              event.preventDefault();
              void navigator.clipboard.writeText(content);
              selectAllRef.current = false;
              setAllSelected(false);
              setContent("");
              setActiveLine(0);
            }}
            onKeyDown={handleEditorKeyDown}
            className={`block min-h-8 w-full resize-none bg-transparent text-ivory caret-acid placeholder:text-muted outline-none wrap-break-word px-4 py-1 font-serif text-lg selection:bg-acid selection:text-void ${
              allSelected ? "bg-acid/20 text-void" : ""
            }`}
          />
          {deferredAfter && (
            <pre
              className={`whitespace-pre-wrap px-4 pb-4 font-mono text-ivory ${
                allSelected ? "bg-acid/20" : ""
              }`}
            >
              {deferredAfter}
            </pre>
          )}
          {after && (
            <MathJaxContent
              className={`Article w-full px-4 pb-4 ${
                allSelected ? "bg-acid/20" : ""
              }`}
              html={marked.parse(after, { async: false, breaks: true })}
            />
          )}
        </div>
      )}
      <hr className="border-border mb-50" />
      <div className="absolute bottom-0 w-6/10 border border-border bg-charcoal/95 backdrop-blur-sm mb-10 h-20 rounded-3xl p-3 flex items-center justify-between gap-5 mx-10">
        <div className="flex w-full gap-10">
          <button
            type="button"
            onClick={() => {
              setRawMode((current) => {
                if (current) {
                  setActiveLine((line) =>
                    Math.min(line, content.split("\n").length - 1),
                  );
                }
                return !current;
              });
              setAllSelected(false);
            }}
            className="border border-electric text-electric rounded-3xl px-3 py-1 hover:bg-electric hover:text-ivory cursor-pointer"
          >
            {rawMode ? "Preview" : "Raw"}
          </button>
          <input
            type="text"
            required
            placeholder="Insira o título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-surface px-3 py-1 rounded-3xl outline-none border border-border text-ivory placeholder:text-muted focus:border-electric focus:bg-surface"
          />
          <input
            type="text"
            required
            placeholder="Insira a descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-surface px-3 py-1 rounded-3xl outline-none border border-border text-ivory placeholder:text-muted focus:border-electric focus:bg-surface"
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
              setActiveLine(0);
            }}
            type="reset"
            className="flex justify-center items-center bg-scarlet/60 rounded-full border border-scarlet hover:bg-scarlet/90 focus:bg-scarlet/90 cursor-pointer"
          >
            <FaRegTrashCan className="size-11 p-3" />
          </button>
          <button
            type="submit"
            className="flex justify-center items-center bg-acid text-void rounded-full border border-acid hover:bg-acid/80 focus:bg-acid/80 cursor-pointer"
          >
            <MdOutlineDone className="size-11 p-3" />
          </button>
        </div>
      </div>
    </form>
  );
}
