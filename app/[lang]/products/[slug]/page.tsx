// app/[lang]/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/src/lib/prisma";
import { Prisma } from "@prisma/client";

type TContent = { title: string; desc: string; specs?: string };

// Project modelinin ilişkileriyle birlikte tipini çıkarıyoruz
type ProjectWithRels = Prisma.ProjectGetPayload<{
  include: { photos: true; translations: true };
}>;

type PageProps = {
  params: { lang: string; slug: string };
};

function pickLocalizedContent(project: ProjectWithRels, lang: string): TContent {
  // translations ilişkisinde dil eşleşiyorsa onu kullan
  const tr = project.translations?.find((t: any) => t.lang === lang);
  if (tr) {
    return {
      title: tr.title ?? project.titleTr ?? project.slug,
      desc: tr.desc ?? project.descTr ?? "",
      specs: tr.specs ?? undefined,
    };
  }
  // fallback: modeldeki TR alanları
  return {
    title: project.titleTr ?? project.slug,
    desc: project.descTr ?? "",
  };
}

export default async function Page({ params: { lang, slug } }: PageProps) {
  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      photos: true,
      translations: true,
    },
  });

  if (!project) return notFound();

  const content = pickLocalizedContent(project, lang);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{content.title}</h1>
        {content.desc && (
          <p className="text-muted-foreground leading-relaxed">{content.desc}</p>
        )}
      </header>

      {/* Kapak görseli veya ilk fotoğraf */}
      {(project.coverUrl || project.photos?.[0]?.url) && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={project.coverUrl || project.photos[0].url}
            alt={content.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Specs varsa göster */}
      {content.specs && (
        <section className="prose dark:prose-invert max-w-none">
          <h2>Özellikler</h2>
          <pre className="whitespace-pre-wrap">{content.specs}</pre>
        </section>
      )}

      {/* Fotoğraf galerisi */}
      {project.photos && project.photos.length > 1 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.photos.slice(1).map((p) => (
            <div key={p.id} className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={p.url}
                alt={p.alt ?? content.title}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

// (Opsiyonel) SSG/ISR düşünüyorsanız, aşağıdakileri ekleyebilirsiniz:
// export async function generateStaticParams() {
//   const slugs = await prisma.project.findMany({ select: { slug: true } });
//   return slugs.map(({ slug }) => ({ slug, lang: "tr" })); // dillerinize göre çoğaltın
// }
