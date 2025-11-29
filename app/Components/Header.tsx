import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import type { Route } from "../+types/root";

interface componentProps {
  onLoginClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onRegisterClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Header({ onLoginClick, onRegisterClick }: componentProps) {
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
      <div className="w-3/8 flex items-center">
        <h1 className="text-3xl font-extrabold justify-evenly ml-20 items-center my-1">
          <Link to="/">Core dump</Link>
        </h1>
      </div>
      <div className="w-5/8 flex items-center justify-center gap-2">
        <Link
          to="/about"
          className="text-neutral-500 w-full truncate flex justify-end hover:bg-white/80 hover:underline bg-white/50 py-1 px-2 backdrop-blur-xs rounded-4xl"
        >
          about me
        </Link>
        <div className="focus-within:bg-neutral-100 bg-neutral-300 h-8 border px-5 py-0.5 rounded-4xl flex items-center gap-2">
          <FaSearch className="size-15" />
          <input type="text" ref={inputRef} className="outline-none" />
          <p className="w-full truncate">Ctrl + K</p>
        </div>
        <div className="flex mx-5">
          <button
            className="text-neutral-500 hover:cursor-pointer w-full truncate flex justify-end hover:bg-white/80 hover:underline bg-white/50 py-1 px-2 backdrop-blur-xs rounded-4xl text-clip"
            onClick={onLoginClick}
          >
            Sign in
          </button>
          <button
            className="text-neutral-500 hover:cursor-pointer w-full truncate flex justify-start hover:bg-white/80 hover:underline bg-white/50 py-1 px-2 backdrop-blur-xs rounded-4xl"
            onClick={onRegisterClick}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
