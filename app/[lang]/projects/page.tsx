// app/[lang]/projects/page.tsx
import Link from "next/link";
import { prisma } from "@/src/lib/prisma";

type PageProps = { params: { lang: string } };

type ProjectCard = {
  id: string;
  slug: string;
  coverUrl: string | null;
  titleTr: string | null;
  translations: { lang: string; title: string | null }[];
};

const s = (v: string | null | undefined) => v ?? "";

export default async function ProjectsPage({ params: { lang } }: PageProps) {
  const list: ProjectCard[] = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      coverUrl: true,
      titleTr: true,
      translations: { select: { lang: true, title: true } },
    },
  });

  return (
    <main className="container section">
      <h1 className="h2 mb-6">Projects</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {list.map((p: ProjectCard) => {
          const tr = p.translations.find((t) => t.lang === lang);
          const title = lang === "tr" ? s(p.titleTr) : s(tr?.title ?? p.titleTr);
          return (
            <Link key={p.id} href={`/${lang}/projects/${p.slug}`} className="card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.coverUrl ?? "/placeholder.jpg"}
                alt=""
                style={{ height: 176, width: "100%", objectFit: "cover", borderRadius: 6 }}
              />
              <div className="h4 mt-3">{title}</div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
