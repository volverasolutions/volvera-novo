'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { translations } from '@/i18n/translations'
import type { Lang } from '@/i18n/translations'

export default function About({ lang }: { lang: Lang }) {
  const t = translations[lang].about

  return (
    <section id="sobre" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sky-400 text-sm font-medium mb-6">{t.badge}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {t.title}{' '}<span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-5">{t.p1}</p>
          <p className="text-white/60 text-base leading-relaxed mb-8">{t.p2}</p>

          <div className="flex flex-col gap-3 mb-10">
            {t.pillars.map((pillar, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-sky-400 flex-shrink-0" />
                <span className="text-white/65 text-sm">{pillar}</span>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 btn-gradient text-white px-8 py-4 rounded-full font-semibold text-base shadow-[0_0_30px_rgba(56,189,248,0.2)]"
          >
            {t.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </motion.button>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="relative flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-purple-600/20 rounded-3xl blur-3xl scale-110" />
            <div className="relative glass-card p-12 rounded-3xl flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-purple-600 rounded-2xl blur-2xl opacity-30 scale-110 animate-glow-pulse" />
                <Image src="/logo.png" alt="Volvera Solutions" width={280} height={280} className="relative rounded-2xl object-contain" />
              </div>
            </div>
          </div>
          {t.stats.map((stat, i) => (
            <div key={i} className={`absolute ${i === 0 ? '-top-6 -right-6' : '-bottom-6 -left-6'} glass-card p-4 rounded-2xl`}>
              <div className="text-xs text-white/40 mb-1">{stat.label}</div>
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
