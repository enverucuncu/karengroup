import { prisma } from '@/src/lib/prisma'

export default async function ProductPage({ params:{ lang, slug } }:{ params:{ lang:string; slug:string } }){
  const p = await prisma.product.findUnique({ where: { slug }, include: { photos: true, translations: true } })
  if (!p) return <div className="container section">Not found</div>
  const t = lang === 'tr' ? { title:p.titleTr, desc:p.descTr, specs:p.specsTr } : (p.translations.find(x=>x.lang===lang) ?? { title:p.titleTr, desc:p.descTr, specs:p.specsTr })
  return (
    <main className="container section">
      <h1 className="h1">{t.title}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.coverUrl} alt="" style={{maxHeight:400, width:'100%', objectFit:'contain', borderRadius:8}} />
      <div className="grid gap-4 md:grid-cols-3 my-6">
        {p.photos.map(ph => <img key={ph.id} src={ph.url} alt="" style={{borderRadius:8}} />)}
      </div>
      <section className="prose prose-invert max-w-none">
        <h2 className="h2">Ürün Açıklaması</h2>
        <div dangerouslySetInnerHTML={{ __html: t.desc }} />
        <h3 className="h3 mt-6">Teknik Özellikler</h3>
        <div dangerouslySetInnerHTML={{ __html: t.specs }} />
      </section>
    </main>
  )
}
