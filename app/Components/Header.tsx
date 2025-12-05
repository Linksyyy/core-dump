import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useUserSession } from "~/globalContext";

interface componentProps {
  onLoginClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onRegisterClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Header({
  onLoginClick,
  onRegisterClick,
}: componentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const userSession = useUserSession();

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        if (inputRef.current) inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeydown, { capture: true });

    return () => {
      window.removeEventListener("keydown", handleKeydown, { capture: true });
    };
  }, []);

  return (
    <div className="fixed flex w-full bg-white/10 backdrop-blur-sm justify-between items-center space-x-2 border-b border-neutral-300 max-h-15">
      <div className="w-3/8 flex items-center">
        <h1 className="text-3xl font-extrabold justify-evenly ml-20 items-center my-1">
          <Link to="/">Core dump</Link>
        </h1>
      </div>
      <div className="w-2/6"></div>
      <div className="w-5/8 flex items-center justify-between gap-2">
        <div className="flex gap-20 w-full">
          <Link
            to="/about"
            className="text-neutral-500 truncate flex justify-center hover:bg-white/80 hover:underline bg-white/50 py-1 px-6 backdrop-blur-xs rounded-full"
          >
            about me
          </Link>
          <div className="focus-within:bg-neutral-100 bg-neutral-300 max-w-200 w-full h-8 border px-5 py-0.5 rounded-4xl flex items-center gap-2 justify-between">
            <FaSearch className="size-5 h-full" />
            <input type="text" ref={inputRef} className="outline-none w-7/10" />
            <div className="w-fit h-fit">
              <p className="truncate">Ctrl + K</p>
            </div>
          </div>
        </div>
        <div className="flex mx-5">
          {!userSession.isLoggedIn ? (
            <>
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
            </>
          ) : (
            <h2 className="text-sm trucante w-full text-neutral-500 text-center whitespace-nowrap">
              {" "}
              Logged as {userSession.username}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}
