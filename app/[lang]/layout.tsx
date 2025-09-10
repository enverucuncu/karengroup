import '@/app/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'

export default function RootLayout({ children, params:{ lang } }:{ children:ReactNode; params:{ lang:string } }){
  return (
    <html lang={lang}>
      <body>
        <header className="bg-[#121212] shadow-md fixed top-0 inset-x-0 z-50">
          <div className="container flex items-center justify-between py-4">
            <Link href={`/${lang}`} className="flex items-center gap-2">
              <Image src="/logo.png" alt="AEGISTIC" width={50} height={50} />
              <div className="text-2xl font-bold text-brand-primary">AEGISTIC</div>
            </Link>
            <nav>
              <ul className="flex gap-6">
                <li><Link href={`/${lang}/`} className="hover:text-brand-primary">Home</Link></li>
                <li><Link href={`/${lang}/about`} className="hover:text-brand-primary">About Us</Link></li>
                <li><Link href={`/${lang}/products`} className="hover:text-brand-primary">Products</Link></li>
                <li><Link href={`/${lang}/projects`} className="hover:text-brand-primary">Projects</Link></li>
                <li><Link href={`/${lang}/blog`} className="hover:text-brand-primary">Blog</Link></li>
                <li><Link href={`/${lang}/contact`} className="hover:text-brand-primary">Contact</Link></li>
              </ul>
            </nav>
            <div className="hidden md:flex items-center gap-4 text-sm">
              <span className="flex items-center text-brand-primary">+90 123 456 7890</span>
            </div>
          </div>
        </header>
        <div style={{height:90}} />
        {children}
        <footer className="footer">
          <div className="container grid gap-10 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="AEGISTIC" width={40} height={40} />
                <div className="text-xl font-bold text-brand-primary">AEGISTIC</div>
              </div>
              <p className="text-gray-400 mb-4">AEGISTIC is a leading provider of innovative security solutions, committed to protecting people, property, and infrastructure.</p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 flex items-center justify-center border border-brand-primary rounded-full text-brand-primary">F</a>
                <a href="#" className="w-10 h-10 flex items-center justify-center border border-brand-primary rounded-full text-brand-primary">T</a>
                <a href="#" className="w-10 h-10 flex items-center justify-center border border-brand-primary rounded-full text-brand-primary">in</a>
                <a href="#" className="w-10 h-10 flex items-center justify-center border border-brand-primary rounded-full text-brand-primary">IG</a>
              </div>
            </div>
            <div>
              <h3>Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href={`/${lang}/`}>Home</Link></li>
                <li><Link href={`/${lang}/about`}>About Us</Link></li>
                <li><Link href={`/${lang}/products`}>Products</Link></li>
                <li><Link href={`/${lang}/projects`}>Projects</Link></li>
                <li><Link href={`/${lang}/blog`}>Blog</Link></li>
                <li><Link href={`/${lang}/contact`}>Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3>Contact Us</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex gap-2"><span className="text-brand-primary">📍</span><p>123 Security Street, Istanbul, Turkey</p></div>
                <div className="flex gap-2"><span className="text-brand-primary">📞</span><p>+90 123 456 7890</p></div>
                <div className="flex gap-2"><span className="text-brand-primary">✉️</span><p>info@karengrubu.com</p></div>
              </div>
            </div>
          </div>
          <div className="text-center border-t border-brand-primary/30 mt-10 pt-4 text-sm text-gray-400">© {new Date().getFullYear()} AEGISTIC. All Rights Reserved.</div>
        </footer>
      </body>
    </html>
  )
}
