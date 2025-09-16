// app/[lang]/page.tsx
import Link from "next/link";
import { prisma } from "@/src/lib/prisma";

type PageProps = { params: { lang: string } };

export default async function Home({ params: { lang } }: PageProps) {
  const latest = await prisma.project.findMany({
    select: {
      titleTr: true,
      descTr: true,
      slug: true,
      coverUrl: true,
      createdAt: true, // <<< önemli
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      {/* ... UI ... */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            {latest.map((p, i) => (
              <div key={p.slug ?? i} className="card">
                <div className="text-5xl mb-4" style={{ color: "var(--brand-primary)" }}>★</div>
                <div className="h3">{p.titleTr ?? ""}</div>
                <p dangerouslySetInnerHTML={{ __html: p.descTr ?? "" }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
