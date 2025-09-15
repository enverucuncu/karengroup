// app/[lang]/products/[slug]/page.tsx
import type { Prisma } from "@prisma/client";
import { prisma } from "@/src/lib/prisma";

type PageProps = { params: { lang: string; slug: string } };
type TContent = { title: string; desc: string; specs: string };
type ProductWithRels = Prisma.ProductGetPayload<{
  include: { photos: true; translations: true };
}>;

export default async function ProductPage({ params: { lang, slug } }: PageProps) {
  const p: ProductWithRels | null = await prisma.product.findUnique({
    where: { slug },
    include: { photos: true, translations: true },
  });

  if (!p) return <div className="container section">Not found</div>;

  // TR ise TR alanları, değilse çevirilerden eşleşen dili çek
  const match = p.translations.find(
    (tr: ProductWithRels["translations"][number]) => tr.lang === lang
  );

  const t: TContent = match
    ? { title: match.title, desc: match.desc, specs: match.specs }
    : { title: p.titleTr, desc: p.descTr, specs: p.specsTr };

  return (
    <main className="container section">
      <h1 className="h1">{t.title}</h1>

      {/* Kapak görseli */}
      {p.coverUrl && (
        <div className="mb-6">
          <img src={p.coverUrl} alt={t.title} style={{ width: "100%", height: "auto" }} />
        </div>
      )}

      {/* Galeri */}
      {p.photos?.length ? (
        <div className="features-grid mb-8">
          {p.photos.map((ph, i) => (
            <div key={i} className="card">
              <img src={ph.url} alt={`${t.title} - ${i + 1}`} style={{ width: "100%", height: "auto" }} />
            </div>
          ))}
        </div>
      ) : null}

      {/* Açıklama */}
      <section className="mb-10">
        <h2 className="h3">Description</h2>
        <div dangerouslySetInnerHTML={{ __html: t.desc }} />
      </section>

      {/* Teknik Özellikler */}
      <section>
        <h2 className="h3">Technical Specs</h2>
        <div dangerouslySetInnerHTML={{ __html: t.specs }} />
      </section>
    </main>
  );
}
