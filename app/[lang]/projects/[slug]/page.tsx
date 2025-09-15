// app/[lang]/projects/[slug]/page.tsx
import { prisma } from "@/src/lib/prisma";

type PageProps = { params: { lang: string; slug: string } };
type TContent = { title: string; desc: string };
const s = (v: string | null | undefined) => v ?? "";

export default async function ProjectDetailPage({ params: { lang, slug } }: PageProps) {
  const p = await prisma.project.findUnique({
    where: { slug },
    include: { photos: true, translations: true },
  });

  if (!p) return <div className="container section">Not found</div>;

  const match = p.translations.find(
    (x: { lang: string; title: string | null; desc: string | null }) => x.lang === lang
  );

  const t: TContent =
    lang === "tr"
      ? { title: s(p.titleTr), desc: s(p.descTr) }
      : { title: s(match?.title ?? p.titleTr), desc: s(match?.desc ?? p.descTr) };

  return (
    <main className="container section">
      <h1 className="h1">{t.title}</h1>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      {p.photos.length > 0 && (
        <img
          src={p.photos[0].url}
          alt={t.title}
          style={{ width: "100%", maxHeight: 420, objectFit: "cover", borderRadius: 8 }}
        />
      )}

      <div className="prose mt-6" dangerouslySetInnerHTML={{ __html: t.desc }} />

      {p.photos.length > 1 && (
        <div className="grid gap-3 mt-6 md:grid-cols-3">
          {p.photos.slice(1).map((ph: typeof p.photos[number]) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={ph.id} src={ph.url} alt="" style={{ width: "100%", borderRadius: 6 }} />
          ))}
        </div>
      )}
    </main>
  );
}
