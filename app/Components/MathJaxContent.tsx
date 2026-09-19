import { useEffect, useRef } from "react";

declare global {
  interface Window {
    MathJax?: {
      startup?: {
        promise: Promise<void>;
      };
      typesetClear?: (elements?: HTMLElement[]) => void;
      typesetPromise?: (elements?: HTMLElement[]) => Promise<void>;
    };
  }
}

type MathJaxContentProps = {
  html: string;
  className?: string;
};

export default function MathJaxContent({
  html,
  className,
}: MathJaxContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const typeset = async () => {
      const mathJax = window.MathJax;
      const element = contentRef.current;

      if (!mathJax?.typesetPromise || !element || cancelled) return;

      await mathJax.startup?.promise;
      if (cancelled || !contentRef.current) return;

      mathJax.typesetClear?.([contentRef.current]);
      await mathJax.typesetPromise([contentRef.current]);
    };

    const handleMathJaxReady = () => {
      void typeset().catch((error) => {
        console.error("MathJax failed to render content", error);
      });
    };

    handleMathJaxReady();
    window.addEventListener("mathjax-ready", handleMathJaxReady);

    return () => {
      cancelled = true;
      window.removeEventListener("mathjax-ready", handleMathJaxReady);
    };
  }, [html]);

  return (
    <div
      ref={contentRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
