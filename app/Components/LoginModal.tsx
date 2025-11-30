import { useState } from "react";

interface componentProps {
  toggleVisible: () => void;
}

export default function Login({ toggleVisible }: componentProps) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorFeedback, setErrorFeedback] = useState("");

  async function handleSubmit() {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      }),
    });
    if (res.ok) toggleVisible();
    if ((await res.json()).message === "Wrong password") {
      setErrorFeedback("Senha incorreta");
      setPasswordInput("");
    }
  }

  return (
    <div
      className="absolute inset-0 bg-neutral-900/20 z-100 flex justify-center items-center"
      onClick={toggleVisible}
    >
      <div
        className={`absolute bg-red-500 border border-neutral-500 px-5
        py-2 rounded-4xl transform transition ease-in-out duration-100 -top-10
        ${errorFeedback ? "translate-y-20 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <h4 className="text-white text-sm">{errorFeedback}</h4>
      </div>
      <form
        className="bg-white p-10 rounded-4xl border border-neutral-500 min-w-80 max-w-2/3 flex flex-col items-center gap-5"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h1 className="text-2xl font-extrabold">Entrar</h1>
        <div className="w-full">
          <label htmlFor="username" className="font-bold">
            Nome de usuário
          </label>
          <input
            type="text"
            placeholder="Usuário..."
            required
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="focus-within:bg-neutral-100 bg-neutral-300 h-8 border px-5 py-0.5 rounded-4xl flex items-center gap-2 outline-none w-full"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="font-bold">
            Senha
          </label>
          <input
            type="password"
            placeholder="Senha..."
            required
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="focus-within:bg-neutral-100 bg-neutral-300 h-8 border px-5 py-0.5 rounded-4xl flex items-center gap-2 outline-none w-full"
          />
        </div>
        <div className="w-full flex justify-between">
          <button
            type="button"
            className="bg-red-800 w-3/8 text-white rounded-4xl px-3 py-1"
            onClick={toggleVisible}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-green-700 w-3/8 text-white rounded-4xl px-3 py-1"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
