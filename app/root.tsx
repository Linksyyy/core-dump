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
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.MathJax = {
                tex: {
                  inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                  displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
                },
                svg: {
                  fontCache: 'global'
                }
              };
            `,
          }}
        />

        <script
          defer
          src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"
          onLoad={() => window.dispatchEvent(new Event("mathjax-ready"))}
        />

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
      <h1 className="text-4xl font-extrabold">404</h1>
      Rota não encontrada
      <Link to="/">
        <button className="bg-acid text-void text-sm px-3 py-1 rounded-lg mt-5 cursor-pointer hover:bg-acid/80 border border-acid">
          Retornar para página principal
        </button>
      </Link>
    </div>
  );
}
