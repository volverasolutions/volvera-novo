'use client'

import { motion } from 'framer-motion'
import { Search, Map, Layers, Code2, RefreshCw } from 'lucide-react'
import { translations } from '@/i18n/translations'
import type { Lang } from '@/i18n/translations'

const icons = [Search, Map, Layers, Code2, RefreshCw]
const colors = [
  { grad: 'from-sky-400 to-blue-600', glow: 'rgba(56,189,248,0.2)' },
  { grad: 'from-blue-500 to-indigo-600', glow: 'rgba(99,102,241,0.2)' },
  { grad: 'from-indigo-500 to-purple-600', glow: 'rgba(147,51,234,0.2)' },
  { grad: 'from-purple-600 to-fuchsia-600', glow: 'rgba(192,38,211,0.2)' },
  { grad: 'from-fuchsia-600 to-sky-400', glow: 'rgba(56,189,248,0.2)' },
]

export default function HowItWorks({ lang }: { lang: Lang }) {
  const t = translations[lang].howItWorks

  return (
    <section id="como-funciona" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sky-400 text-sm font-medium mb-4">{t.badge}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            {t.title}{' '}<span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="flex flex-col gap-12">
          {t.steps.map((step, i) => {
            const Icon = icons[i]
            const { grad, glow } = colors[i]
            const isLeft = i % 2 === 0

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative grid lg:grid-cols-2 gap-6 lg:gap-16 items-center ${!isLeft ? 'lg:[&>*:first-child]:order-last' : ''}`}
              >
                <div>
                  <div
                    className="glass-card p-7 max-w-lg hover:border-white/20 transition-all duration-300"
                    style={{ transition: 'box-shadow 0.3s ease' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${glow}` }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
                  >
                    <div className={`flex items-center gap-3 mb-4 ${isLeft ? '' : 'lg:flex-row-reverse'}`}>
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r ${grad}`}>
                        <Icon size={18} className="text-white" />
                      </div>
                      <span className={`text-4xl font-black bg-gradient-to-r ${grad} bg-clip-text text-transparent opacity-30`}>
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>

                <div className="hidden lg:flex justify-center items-center relative">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${grad} flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.3)] z-10 relative`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className={`absolute w-28 h-28 rounded-full bg-gradient-to-r ${grad} opacity-10 animate-ping`} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
