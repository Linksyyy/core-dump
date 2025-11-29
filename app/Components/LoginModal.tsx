interface componentProps {
  toggleVisible: () => void;
}

export default function Login({ toggleVisible }: componentProps) {
  return (
    <div
      className="absolute inset-0 bg-neutral-900/20 z-100 flex justify-center items-center"
      onClick={toggleVisible}
    >
      <form
        className="bg-white p-10 rounded-4xl border border-neutral-500 min-w-80 max-w-2/3 flex flex-col items-center gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-extrabold">Entrar</h1>
        <div className="w-full">
          <label htmlFor="username" className="font-bold">
            Nome de usuário
          </label>
          <input
            type="text"
            placeholder="Usuário..."
            className="focus-within:bg-neutral-100 bg-neutral-300 h-8 border px-5 py-0.5 rounded-4xl flex items-center gap-2 outline-none w-full"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="font-bold">
            Senha
          </label>
          <input
            type="text"
            placeholder="Senha..."
            className="focus-within:bg-neutral-100 bg-neutral-300 h-8 border px-5 py-0.5 rounded-4xl flex items-center gap-2 outline-none w-full"
          />
        </div>
        <div className="w-full flex justify-between">
          <button className="bg-red-800 w-3/8 text-white rounded-4xl px-3 py-1">
            Cancelar
          </button>
          <button className="bg-green-700 w-3/8 text-white rounded-4xl px-3 py-1">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
