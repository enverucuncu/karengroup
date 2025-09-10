import Link from 'next/link'
import { prisma } from '@/src/lib/prisma'

export default async function Products({ params:{ lang } }:{ params:{ lang:string } }){
  const list = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
  return (
    <main className="container section">
      <h1 className="h2 mb-6">Products</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {list.map(p => (
          <Link key={p.id} href={`/${lang}/products/${p.slug}`} className="card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.coverUrl} alt="" style={{height:176, width:'100%', objectFit:'cover', borderRadius:6}} />
            <div className="mt-3 h3">{p.titleTr}</div>
          </Link>
        ))}
      </div>
    </main>
  )
}
