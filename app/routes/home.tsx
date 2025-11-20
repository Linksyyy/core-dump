import { Outlet } from "react-router";
import type { Route } from "./+types/home";

export const meta = ({}: Route.MetaArgs) => [{ title: "Core dump" }];

export default function Home() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
