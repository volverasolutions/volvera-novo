'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Clock, DollarSign } from 'lucide-react'
import { translations } from '@/i18n/translations'
import type { Lang } from '@/i18n/translations'

const gradients = ['from-sky-400 to-blue-600', 'from-purple-600 to-fuchsia-600', 'from-sky-400 to-purple-600']
const resultIcons = [TrendingUp, Clock, DollarSign]

export default function Cases({ lang }: { lang: Lang }) {
  const t = translations[lang].cases

  return (
    <section id="cases" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sky-400 text-sm font-medium mb-4">{t.badge}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            {t.title}{' '}<span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-7">
          {t.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card overflow-hidden group"
            >
              <div className={`h-1.5 bg-gradient-to-r ${gradients[i]} w-full`} />
              <div className="p-7">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-xs text-white/40 font-medium uppercase tracking-widest mb-1">{item.sector}</div>
                    <div className="text-base font-semibold text-white">{item.company}</div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full bg-gradient-to-r ${gradients[i]} text-white font-medium`}>{item.tag}</span>
                </div>

                <div className="mb-4">
                  <div className="text-xs text-sky-400 font-semibold uppercase tracking-wide mb-2">{lang === 'pt' ? 'Desafio' : 'Défi'}</div>
                  <p className="text-white/60 text-sm leading-relaxed">{item.challenge}</p>
                </div>
                <div className="mb-6">
                  <div className="text-xs text-purple-400 font-semibold uppercase tracking-wide mb-2">{lang === 'pt' ? 'Solução' : 'Solution'}</div>
                  <p className="text-white/60 text-sm leading-relaxed">{item.solution}</p>
                </div>

                <div className="border-t border-white/8 pt-5">
                  <div className="text-xs text-white/40 font-semibold uppercase tracking-wide mb-3">{lang === 'pt' ? 'Resultados' : 'Résultats'}</div>
                  <div className="flex flex-col gap-3">
                    {item.results.map((result, j) => {
                      const Icon = resultIcons[j % resultIcons.length]
                      return (
                        <div key={j} className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-white/55 text-xs">
                            <Icon size={12} className="text-sky-400 flex-shrink-0" />
                            {result.label}
                          </div>
                          <span className={`font-bold text-sm bg-gradient-to-r ${gradients[i]} bg-clip-text text-transparent`}>{result.value}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
