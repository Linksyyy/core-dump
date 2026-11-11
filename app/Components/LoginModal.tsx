import { useEffect, useState } from "react";
import { useUserSession } from "~/globalContext";

interface componentProps {
  toggleVisible: () => void;
}

export default function Login({ toggleVisible }: componentProps) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorFeedback, setErrorFeedback] = useState("");
  const [confirmFeedback, setConfirmFeedback] = useState("");
  const userSession = useUserSession();

  useEffect(() => {
    setTimeout(() => {
      setErrorFeedback("");
      setConfirmFeedback("");
    }, 500);
  }, [errorFeedback]);

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
    const { username, isAdmin, message } = await res.json();
    if (message === "Wrong password") {
      setErrorFeedback("Senha incorreta");
      setPasswordInput("");
    }
    if (res.ok) {
      setConfirmFeedback("Login foi um sucesso!");
      setTimeout(() => toggleVisible(), 500);
      userSession.setAuthState(username, isAdmin);
    }
  }

  return (
    <div
      className="absolute inset-0 bg-void/80 z-100 flex justify-center items-center"
      onClick={toggleVisible}
    >
      <div
        className={`absolute bg-scarlet border border-scarlet px-5
        py-2 rounded-4xl transform transition ease-in-out duration-100 -top-10
        ${errorFeedback ? "translate-y-20 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <h4 className="text-ivory text-sm">{errorFeedback}</h4>
      </div>
      <div
        className={`absolute bg-acid border border-acid px-5
        py-2 rounded-4xl transform transition ease-in-out duration-100 -top-10
        ${confirmFeedback ? "translate-y-20 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <h4 className="text-void text-sm">{confirmFeedback}</h4>
      </div>
      <form
        className="bg-charcoal text-ivory p-10 rounded-2xl border border-border min-w-80 max-w-2/3 flex flex-col items-center gap-5"
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
            className="focus-within:bg-surface bg-surface text-ivory placeholder:text-muted h-8 border border-border px-5 py-0.5 rounded-lg flex items-center gap-2 outline-none w-full"
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
            className="focus-within:bg-surface bg-surface text-ivory placeholder:text-muted h-8 border border-border px-5 py-0.5 rounded-lg flex items-center gap-2 outline-none w-full"
          />
        </div>
        <div className="w-full flex justify-between">
          <button
            type="button"
            className="bg-scarlet w-3/8 text-ivory rounded-lg px-3 py-1"
            onClick={toggleVisible}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-acid w-3/8 text-void rounded-lg px-3 py-1"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
