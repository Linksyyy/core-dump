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
    <div className="fixed z-10 flex w-full justify-between items-center space-x-2 border-b border-slate-300 bg-slate-100/90 shadow-sm backdrop-blur-sm max-h-15">
      <div className="w-3/8 flex items-center">
        <h1 className="font-serif text-3xl font-bold tracking-[-0.06em] justify-evenly ml-8 md:ml-16 items-center my-2">
          <Link to="/">Core dump</Link>
        </h1>
      </div>
      <div className="w-2/6"></div>
      <div className="w-5/8 flex items-center justify-between gap-2">
        <div className="flex gap-20 w-full">
          <Link
            to="/about"
            className="text-neutral-600 truncate flex justify-center hover:text-black hover:underline py-1 px-4"
          >
            about me
          </Link>
          <div className="focus-within:bg-white bg-slate-200/70 max-w-200 w-full h-8 border border-slate-300 px-4 py-0.5 rounded-4xl flex items-center gap-2 justify-between">
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
                className="text-neutral-600 hover:cursor-pointer w-full truncate flex justify-end hover:text-black hover:underline py-1 px-2 text-clip"
                onClick={onLoginClick}
              >
                Sign in
              </button>
              <button
                className="text-neutral-600 hover:cursor-pointer w-full truncate flex justify-start hover:text-black hover:underline py-1 px-2"
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
