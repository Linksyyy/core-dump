import { Outlet, useNavigate } from "react-router";
import type { Route } from "./+types/layout";
import Header from "~/Components/Header";

export const meta = ({}: Route.MetaArgs) => [{ title: "Core dump" }];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <Header/>
      <div className="mt-10">layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <div>layout</div>
      <Outlet/>
    </div>
  );
}
