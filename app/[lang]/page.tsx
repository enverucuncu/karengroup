// app/[lang]/page.tsx
import Link from "next/link";
import { prisma } from "@/src/lib/prisma";

type PageProps = { params: { lang: string } };

type LatestItem = {
  titleTr: string;
  descTr: string;
  slug: string;
  coverUrl: string;
  createdAt: Date;
};

export default async function Home({ params: { lang } }: PageProps) {
  const latest: LatestItem[] = await prisma.product.findMany({
    select: {
      titleTr: true,
      descTr: true,
      slug: true,
      coverUrl: true,
      createdAt: true,
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <section className="hero">
        <div className="container hero-content">
          <h1>Technology Leader in Security</h1>
          <p>Uninterrupted Protection with Durable and Aesthetic Solutions</p>
          <div>
            <Link href={`/${lang}/products`} className="btn btn-primary">
              Explore Products
            </Link>
            <Link href={`/${lang}/contact`} className="btn btn-ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-title" style={{ textAlign: "center", marginBottom: 60 }}>
            <h2>Why Choose AEGISTIC</h2>
            <p>We provide innovative security solutions tailored to your specific needs</p>
          </div>

          <div className="features-grid">
            {latest.map((p: LatestItem, i: number) => (
              <div key={i} className="card">
                <div className="text-5xl mb-4" style={{ color: "var(--brand-primary)" }}>★</div>
                <div className="h3">{p.titleTr}</div>
                <p dangerouslySetInnerHTML={{ __html: p.descTr }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
