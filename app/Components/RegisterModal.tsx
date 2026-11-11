import { useEffect, useState } from "react";

interface componentProps {
  toggleVisible: () => void;
}

export default function Login({ toggleVisible }: componentProps) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [password2Input, setPassword2Input] = useState("");
  const [errorFeedback, setErrorFeedback] = useState("");

  useEffect(() => {
    setTimeout(() => setErrorFeedback(""), 2000);
  }, [errorFeedback]);

  async function handleSubmit() {
    if (passwordInput.length < 8 || password2Input.length < 8) {
      setErrorFeedback("A senha deve ter mais de 8 caracteres!");
      return;
    }
    if (passwordInput !== password2Input) {
      setErrorFeedback("Ambas senhas tem que ser iguais! Tente novamente");
      setPasswordInput("");
      setPassword2Input("");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      }),
    });
    if ((await res.json()).message === "This user already exists")
      setErrorFeedback("Este usuário já existe!");
    if (res.ok) toggleVisible();
  }
  return (
    <div
      className="absolute inset-0 bg-void/80 z-100 flex flex-col justify-center items-center"
      onClick={toggleVisible}
    >
      <div
        className={`absolute bg-scarlet border border-scarlet px-5
        py-2 rounded-4xl transform transition ease-in-out duration-100 -top-10
        ${errorFeedback ? "translate-y-20 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <h4 className="text-ivory text-sm">{errorFeedback}</h4>
      </div>
      <form
        className="bg-charcoal text-ivory p-10 rounded-2xl border border-border min-w-120 flex flex-col items-center gap-5"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h1 className="text-2xl font-extrabold">Registrar-se</h1>
        <div className="w-full">
          <label htmlFor="username" className="font-bold">
            Nome de usuário
          </label>
          <input
            type="text"
            placeholder="Usuário..."
            required
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value.trim())}
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
            onChange={(e) => setPasswordInput(e.target.value.trim())}
            className="focus-within:bg-surface bg-surface text-ivory placeholder:text-muted h-8 border border-border px-5 py-0.5 rounded-lg flex items-center gap-2 outline-none w-full"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="font-bold">
            Senha novamente
          </label>
          <input
            type="password"
            required
            value={password2Input}
            onChange={(e) => setPassword2Input(e.target.value.trim())}
            placeholder="Escreva a senha novamente..."
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
