import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Core dump" }];
}

export default function Home() {
  return <></>;
}
