'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import { translations } from '@/i18n/translations'
import type { Lang } from '@/i18n/translations'

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter/X', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
]

const WA_NUMBER = '33746333103'

export default function Footer({ lang }: { lang: Lang }) {
  const t = translations[lang].footer
  const navItems = translations[lang].nav.items

  const scrollTo = (href: string) => {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  const waMsg = encodeURIComponent(translations[lang].whatsapp.floatMessage)
  const waHref = `https://wa.me/${WA_NUMBER}?text=${waMsg}`

  return (
    <footer className="relative border-t border-white/8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image src="/logo.png" alt="Volvera Solutions" width={200} height={56} className="h-14 w-auto object-contain mb-5" />
            <p className="text-white/45 text-sm leading-relaxed mb-4 max-w-xs">{t.slogan}</p>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-white/40 text-xs">🇧🇷 Brasil</span>
              <span className="text-white/20 text-xs">·</span>
              <span className="text-white/40 text-xs">🇫🇷 France</span>
            </div>
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a key={social.label} href={social.href} whileHover={{ scale: 1.1, y: -2 }} aria-label={social.label}
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-sky-400/30 transition-all duration-200"
                  >
                    <Icon size={16} className="text-white/60" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">{t.quickLinks}</h4>
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button onClick={() => scrollTo(item.href)} className="text-white/50 hover:text-white text-sm transition-colors duration-200 text-left">{item.label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">{t.solutions}</h4>
            <ul className="flex flex-col gap-3">
              {t.solutionsList.map((s) => (
                <li key={s}><span className="text-white/50 text-sm">{s}</span></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">{t.contact}</h4>
            <div className="flex flex-col gap-3 mb-6">
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                +33 7 46 33 31 03
              </a>
              <a href="mailto:contato@Volverasolutions.com.br" className="text-white/50 hover:text-white text-sm transition-colors duration-200">contato@Volverasolutions.com.br</a>
              <div className="flex gap-3 mt-1">
                <span className="text-white/35 text-xs flex items-center gap-1">🇧🇷 São Paulo</span>
                <span className="text-white/20 text-xs">·</span>
                <span className="text-white/35 text-xs flex items-center gap-1">🇫🇷 Cognac</span>
              </div>
            </div>
            <motion.button onClick={() => scrollTo('#contato')} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="btn-gradient text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-[0_0_20px_rgba(56,189,248,0.2)]"
            >
              {translations[lang].nav.cta}
            </motion.button>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">{t.copyright}</p>
          <div className="flex items-center gap-6 text-xs text-white/25">
            <a href="#" className="hover:text-white/50 transition-colors">{t.privacy}</a>
            <a href="#" className="hover:text-white/50 transition-colors">{t.terms}</a>
            <a href="#" className="hover:text-white/50 transition-colors">{t.compliance}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
