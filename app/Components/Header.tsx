import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";
import { useEffect, useRef } from "react";

export default function Header() {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        if (inputRef.current) (inputRef.current as HTMLInputElement).focus();
      }
    };

    window.addEventListener("keydown", handleKeydown, { capture: true });

    return () => {
      window.removeEventListener("keydown", handleKeydown, { capture: true });
    };
  }, []);

  return (
    <div className="fixed flex w-full bg-white/10 backdrop-blur-sm justify-between items-center space-x-2 border-b border-neutral-300">
      <div className="w-full flex items-center">
        <h1 className="text-3xl font-extrabold justify-evenly ml-20 items-center my-1">
          Core dump
        </h1>
      </div>
      <div className="w-full flex items-center justify-center space-x-5">
        <Link
          to="/about"
          className="text-neutral-500 hover:bg-white/80 hover:underline bg-white/50 py-1 px-2 backdrop-blur-xs rounded-4xl"
        >
          about
        </Link>
        <div className="focus-within:bg-neutral-100 bg-neutral-300 border px-5 py-0.5 rounded-4xl flex items-center gap-2">
          <FaSearch />
          <input type="text" ref={inputRef} className="outline-none" />
          Ctrl + K
        </div>
      </div>
    </div>
  );
}
