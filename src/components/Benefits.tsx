'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { translations } from '@/i18n/translations'
import type { Lang } from '@/i18n/translations'

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView) return
    const steps = 60
    const duration = 2200
    let step = 0
    const timer = setInterval(() => {
      step++
      setCount(parseFloat((target * (1 - Math.pow(1 - step / steps, 3))).toFixed(0)))
      if (step >= steps) { setCount(target); clearInterval(timer) }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

const gradients = [
  { grad: 'from-sky-400 to-blue-600', glow: 'rgba(56,189,248,0.2)' },
  { grad: 'from-purple-600 to-fuchsia-600', glow: 'rgba(147,51,234,0.2)' },
  { grad: 'from-sky-400 to-purple-600', glow: 'rgba(56,189,248,0.2)' },
  { grad: 'from-fuchsia-500 to-purple-600', glow: 'rgba(192,38,211,0.2)' },
]

export default function Benefits({ lang }: { lang: Lang }) {
  const t = translations[lang].benefits

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-transparent to-purple-950/20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-purple-400 text-sm font-medium mb-4">{t.badge}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            {t.title}{' '}<span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.items.map((item, i) => {
            const { grad, glow } = gradients[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group glass-card p-8 text-center overflow-hidden"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 50px ${glow}, inset 0 0 30px ${glow}` }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
              >
                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${grad} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className={`text-5xl lg:text-6xl font-black mb-3 bg-gradient-to-r ${grad} bg-clip-text text-transparent`}>
                  {'isSymbol' in item && item.isSymbol && 'symbol' in item
                    ? item.symbol
                    : <Counter target={'value' in item ? item.value : 0} suffix={'suffix' in item ? item.suffix : ''} />
                  }
                </div>
                <div className="text-white font-semibold text-base mb-2">{item.label}</div>
                <div className="text-white/40 text-sm">{item.description}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
