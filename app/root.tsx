import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import "./app.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return (
    <div className="flex fixed inset-0 items-center justify-center flex-col">
      <h1 className="text-4xl font-extrabold">404</h1> Rota não encontrada
      <Link to="/">
        <button className="bg-black text-sm text-white px-3 py-1 rounded-full mt-5 cursor-pointer hover:bg-neutral-700 hover:border border border-black">
          Retornar para página principal
        </button>
      </Link>
    </div>
  );
}
