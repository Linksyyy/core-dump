import type { Route } from "../+types/root";

const API_URL = process.env.API_URL

export async function loader({ request: { headers } }: Route.LoaderArgs) {
  const cookie = headers.get("Cookie")!
  const response = await fetch(`${API_URL}/auth`, {
    headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie
    }
  })
  const digested = await response.json()
  if(!response.ok || !digested.isAdmin) throw new Response()
}

export default function Create() {
  return <div>bah teste tche</div>;
}
