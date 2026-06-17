'use client'

import { motion } from 'framer-motion'
import { translations } from '@/i18n/translations'
import type { Lang } from '@/i18n/translations'

const gradients = [
  'from-sky-400 to-blue-600', 'from-purple-600 to-fuchsia-600', 'from-sky-400 to-purple-600', 'from-fuchsia-500 to-purple-600',
  'from-blue-600 to-sky-400', 'from-sky-400 to-blue-600', 'from-purple-600 to-sky-400', 'from-fuchsia-600 to-purple-600',
]

export default function Differentials({ lang }: { lang: Lang }) {
  const t = translations[lang].differentials

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-purple-400 text-sm font-medium mb-4">{t.badge}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            {t.title}{' '}<span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group glass-card p-6 text-center hover:border-white/20 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r ${gradients[i]} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 text-2xl`}>
                {item.emoji}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
