import { NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'
import { translateAll } from '@/src/lib/translate'
const TARGETS = ['en','ar','ru','fr'] as const

export async function POST(req: Request) {
  const fd = await req.formData()
  const titleTr = String(fd.get('titleTr')||'')
  const descTr  = String(fd.get('descTr')||'')
  const specsTr = String(fd.get('specsTr')||'')
  const slug    = String(fd.get('slug')||'')
  const coverUrl= String(fd.get('coverUrl')||'')
  const photos  = JSON.parse(String(fd.get('photos')||'[]')) as string[]
  if(!titleTr||!descTr||!specsTr||!slug||!coverUrl){ return NextResponse.json({ok:false,error:'Eksik alan'}, {status:400}) }

  const product = await prisma.product.create({
    data: { slug, coverUrl, titleTr, descTr, specsTr, photos: { create: photos.map(url=>({url})) } }
  })

  try{
    const packs = await translateAll({ title:titleTr, desc:descTr, specs:specsTr }, TARGETS)
    await prisma.productTranslation.createMany({
      data: packs.map(p=>({ productId: product.id, lang:p.lang, title:p.title, desc:p.desc, specs:p.specs }))
    })
  }catch{}

  return NextResponse.json({ ok:true, id: product.id })
}
