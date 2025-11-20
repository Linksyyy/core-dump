import { Outlet, useNavigate } from "react-router";
import type { Route } from "./+types/layout";
import Header from "~/Components/Header";
import Sidebar from "~/Components/Sidebar";

export const meta = ({}: Route.MetaArgs) => [{ title: "Core dump" }];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0">
      <Header />
      <div className="flex justify-between h-screen">
        <main className="flex-1 overflow-y-auto">
          <div className="h-14 shrink-0" />
          <Outlet />
        </main>
        <section className="w-1/5 flex flex-col overflow-y-auto">
          <div className="h-8 shrink-0" />
          <Sidebar />
        </section>
      </div>
    </div>
  );
}
