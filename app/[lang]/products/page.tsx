// app/[lang]/products/page.tsx
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/src/lib/prisma";

type PageProps = { params: { lang: string } };

type ProductCard = Prisma.ProductGetPayload<{
  select: {
    id: true;
    slug: true;
    coverUrl: true;
    titleTr: true;
    descTr: true;
    translations: { select: { lang: true; title: true; desc: true } };
  };
}>;

const safe = (s: string | null | undefined) => s ?? "";

export default async function ProductsPage({ params: { lang } }: PageProps) {
  const list: ProductCard[] = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      coverUrl: true,
      titleTr: true,
      descTr: true,
      translations: { select: { lang: true, title: true, desc: true } },
    },
  });

  return (
    <main className="container section">
      <h1 className="h2 mb-6">Products</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {list.map((p) => {
          const tr = p.translations.find((t) => t.lang === lang);
          const title = lang === "tr" ? safe(p.titleTr) : safe(tr?.title ?? p.titleTr);
          const desc = lang === "tr" ? safe(p.descTr) : safe(tr?.desc ?? p.descTr);

          return (
            <Link key={p.id} href={`/${lang}/products/${p.slug}`} className="card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.coverUrl}
                alt={title}
                style={{ height: 176, width: "100%", objectFit: "cover", borderRadius: 6 }}
              />
              <div className="h3 mt-3">{title}</div>
              <p className="mt-2" dangerouslySetInnerHTML={{ __html: desc }} />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
