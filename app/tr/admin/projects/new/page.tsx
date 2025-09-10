'use client'
import { useState } from 'react'
export default function NewProject(){
  const [photos, setPhotos] = useState<string[]>([])
  async function onSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault(); const fd = new FormData(e.currentTarget); fd.set('photos', JSON.stringify(photos))
    const r = await fetch('/api/admin/projects', { method:'POST', body: fd }); const j = await r.json(); alert(j.ok?'Kaydedildi':'Hata: '+j.error)
  }
  return (
    <div className="container section">
      <h1 className="h2 mb-6">Yeni Proje (TR giriş)</h1>
      <form onSubmit={onSubmit} className="grid gap-4 max-w-2xl">
        <input name="slug" placeholder="slug" className="px-3 py-2 rounded bg-black/30 border border-white/10" required/>
        <input name="titleTr" placeholder="Başlık (TR)" className="px-3 py-2 rounded bg-black/30 border border-white/10" required/>
        <textarea name="descTr" placeholder="Açıklama (TR - HTML)" className="px-3 py-2 rounded bg-black/30 border border-white/10" required/>
        <input name="coverUrl" placeholder="Kapak URL" className="px-3 py-2 rounded bg-black/30 border border-white/10" required/>
        <div>
          <div className="flex items-center justify-between"><label>Fotoğraflar</label><button type="button" onClick={()=>setPhotos(p=>[...p,'https://...'])} className="text-brand-primary">+ URL</button></div>
          <div className="space-y-2 mt-2">
            {photos.map((u,i)=>(
              <div key={i} className="flex gap-2">
                <input value={u} onChange={e=>setPhotos(prev=>prev.map((x,j)=>j===i?e.target.value:x))} className="flex-1 px-3 py-2 rounded bg-black/30 border border-white/10"/>
                <button type="button" onClick={()=>setPhotos(p=>p.filter((_,j)=>j!==i))} className="border border-white/10 px-2 rounded">Sil</button>
              </div>
            ))}
          </div>
        </div>
        <button className="btn btn-primary">Kaydet & Çevir</button>
      </form>
    </div>
  )
}
