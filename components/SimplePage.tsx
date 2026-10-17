import type { Metadata } from "next";

export type SimpleProps = { title?: string; eyebrow?: string; h1: string; intro: string; children: React.ReactNode };

export function simpleMetadata(p: { title: string; intro: string }): Metadata {
  return { title: p.title, description: p.intro };
}

export default function SimplePage({ eyebrow = "Malory", h1, intro, children }: SimpleProps) {
  return (
    <main>
      <div className="wrap page-head">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{h1}</h1>
        <p>{intro}</p>
      </div>
      <section style={{ paddingTop: 10 }}><div className="wrap">{children}</div></section>
    </main>
  );
}