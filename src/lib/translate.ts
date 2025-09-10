const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY
const ENDPOINT = 'https://translation.googleapis.com/language/translate/v2'

type Block = { title:string; desc:string; specs?:string }

export async function translateAll(block: Block, langs: readonly string[]) {
  if(!API_KEY){
    return langs.map(l=>({ lang:l, title:block.title, desc:block.desc, specs:block.specs||'' }))
  }
  const payload = async (q:string, target:string) => {
    const r = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ q, target, source:'tr', format:'text' })
    })
    const j = await r.json()
    return j.data.translations[0].translatedText as string
  }
  const results:any[] = []
  for (const lang of langs){
    const title = await payload(block.title, lang)
    const desc  = await payload(block.desc,  lang)
    const specs = block.specs ? await payload(block.specs, lang) : ''
    results.push({ lang, title, desc, specs })
  }
  return results
}
