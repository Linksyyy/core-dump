import { useNavigate } from "react-router";
import type { Route } from "./+types/home";
import { RiBloggerLine } from "react-icons/ri";

export const meta = ({}: Route.MetaArgs) => [{ title: "Core dump" }];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="border-2 p-10 rounded-4xl flex flex-col justify-between w-3/6 h-2/3 items-center">
        <div>Bem vindo ao core dump</div>
        <button
          className="bg-blue-900 hover:bg-blue-950 py-2 rounded-4xl w-3/5 flex items-center justify-center"
          onClick={() => navigate("/articles")}
        >
          <RiBloggerLine className="size-6" />
          <h2 className="text-xl">Blog</h2>
        </button>
      </div>
    </div>
  );
}
