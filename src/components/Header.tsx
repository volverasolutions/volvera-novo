'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { translations } from '@/i18n/translations'
import type { Lang } from '@/i18n/translations'

const WA_NUMBER = '33746333103'

export default function Header({ lang }: { lang: Lang }) {
  const t = translations[lang]
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const waMsg = encodeURIComponent(t.whatsapp.heroMessage)
  const waHref = `https://wa.me/${WA_NUMBER}?text=${waMsg}`

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/50 backdrop-blur-2xl border-b border-white/8 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3.5 flex items-center justify-between gap-6">
        <button onClick={() => handleNavClick('#inicio')} className="flex-shrink-0">
          <Image src="/logo.png" alt="Volvera Solutions" width={200} height={56} className="h-12 w-auto object-contain" priority />
        </button>

        <nav className="hidden xl:flex items-center gap-6">
          {t.nav.items.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-white/60 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide relative group whitespace-nowrap"
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-sky-400 to-purple-600 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <LanguageSwitcher lang={lang} />
          <motion.button
            onClick={() => handleNavClick('#contato')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-gradient text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-[0_0_25px_rgba(56,189,248,0.2)] hover:shadow-[0_0_40px_rgba(147,51,234,0.4)] transition-shadow duration-300"
          >
            {t.nav.cta}
          </motion.button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher lang={lang} />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white/80 hover:text-white transition-colors p-1" aria-label="Menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-2xl border-t border-white/8"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {t.nav.items.map((item) => (
                <button key={item.label} onClick={() => handleNavClick(item.href)} className="text-white/70 hover:text-white py-3 text-sm font-medium text-left border-b border-white/5 last:border-0 transition-colors">
                  {item.label}
                </button>
              ))}
              <button onClick={() => handleNavClick('#contato')} className="mt-4 btn-gradient text-white px-6 py-3.5 rounded-full text-sm font-semibold text-center">
                {t.nav.cta}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
