import { Outlet } from "react-router";
import type { Route } from "../+types/layout";
import Sidebar from "~/Components/Sidebar";

export const meta = ({}: Route.MetaArgs) => [{ title: "Core dump" }];

export default function Home() {
  return (
    <div>
      OIOI
      <Outlet />
      <Sidebar/>
    </div>
  );
}
