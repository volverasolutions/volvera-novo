'use client'

import { motion } from 'framer-motion'
import { Bot, Zap, Link2, MessageSquare, BarChart3, Brain } from 'lucide-react'
import { translations } from '@/i18n/translations'
import type { Lang } from '@/i18n/translations'

const icons = [Bot, Zap, Link2, MessageSquare, BarChart3, Brain]
const gradients = [
  { grad: 'from-sky-400 to-blue-600', glow: 'rgba(56,189,248,0.15)' },
  { grad: 'from-purple-600 to-fuchsia-600', glow: 'rgba(147,51,234,0.15)' },
  { grad: 'from-blue-600 to-purple-600', glow: 'rgba(37,99,235,0.15)' },
  { grad: 'from-sky-400 to-purple-600', glow: 'rgba(56,189,248,0.15)' },
  { grad: 'from-fuchsia-600 to-purple-600', glow: 'rgba(192,38,211,0.15)' },
  { grad: 'from-purple-600 to-sky-400', glow: 'rgba(147,51,234,0.15)' },
]

export default function Services({ lang }: { lang: Lang }) {
  const t = translations[lang].services

  return (
    <section id="solucoes" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sky-400 text-sm font-medium mb-4">{t.badge}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            {t.title}{' '}<span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((service, i) => {
            const Icon = icons[i]
            const { grad, glow } = gradients[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative glass-card p-7 cursor-default"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${glow}, inset 0 0 40px ${glow}` }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
              >
                <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r ${grad} opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-b-2xl`} />
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${grad} mb-5 shadow-lg`}>
                  <Icon size={22} className="text-white" />
                </div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-lg font-semibold text-white group-hover:text-sky-400 transition-colors duration-300">{service.title}</h3>
                  <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${grad} text-white font-medium opacity-70`}>{service.badge}</span>
                </div>
                <p className="text-white/55 text-sm leading-relaxed">{service.description}</p>
                <div className="mt-5 flex items-center gap-2 text-sky-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {lang === 'pt' ? 'Saiba mais' : 'En savoir plus'}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
