import { NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'
import { translateAll } from '@/src/lib/translate'
const TARGETS2 = ['en','ar','ru','fr'] as const

export async function POST(req: Request) {
  const fd = await req.formData()
  const titleTr = String(fd.get('titleTr')||'')
  const descTr  = String(fd.get('descTr')||'')
  const slug    = String(fd.get('slug')||'')
  const coverUrl= String(fd.get('coverUrl')||'')
  const photos  = JSON.parse(String(fd.get('photos')||'[]')) as string[]
  if(!titleTr||!descTr||!slug||!coverUrl){ return NextResponse.json({ok:false,error:'Eksik alan'}, {status:400}) }

  const project = await prisma.project.create({
    data: { slug, coverUrl, titleTr, descTr, photos: { create: photos.map(url=>({url})) } }
  })

  try{
    const packs = await translateAll({ title:titleTr, desc:descTr }, TARGETS2)
    await prisma.projectTranslation.createMany({
      data: packs.map(p=>({ projectId: project.id, lang:p.lang, title:p.title, desc:p.desc }))
    })
  }catch{}

  return NextResponse.json({ ok:true, id: project.id })
}
