'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { translations } from '@/i18n/translations'
import type { Lang } from '@/i18n/translations'

export default function FAQ({ lang }: { lang: Lang }) {
  const t = translations[lang].faq
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sky-400 text-sm font-medium mb-4">{t.badge}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            {t.title}{' '}<span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-white/55 text-lg">{t.subtitle}</p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {t.items.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`glass-card overflow-hidden transition-all duration-300 ${openIndex === i ? 'border-sky-400/25' : 'hover:border-white/15'}`}
            >
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full px-7 py-5 flex items-center justify-between gap-4 text-left">
                <span className={`text-base font-semibold transition-colors duration-200 ${openIndex === i ? 'text-sky-400' : 'text-white'}`}>{faq.q}</span>
                <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'bg-gradient-to-r from-sky-400 to-purple-600' : 'bg-white/5'}`}>
                  {openIndex === i ? <Minus size={14} className="text-white" /> : <Plus size={14} className="text-white/70" />}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
                    <div className="px-7 pb-6 text-white/60 text-sm leading-relaxed border-t border-white/8 pt-4">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-12 text-center glass-card p-8 rounded-2xl">
          <p className="text-white/60 mb-4">{t.contactText}</p>
          <button onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 text-sky-400 hover:text-white font-medium text-sm transition-colors duration-200">
            {t.contactCta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
