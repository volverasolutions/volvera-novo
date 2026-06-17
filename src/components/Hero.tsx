'use client'

import { motion } from 'framer-motion'
import { translations } from '@/i18n/translations'
import type { Lang } from '@/i18n/translations'

const WA_NUMBER = '33746333103'

const floatCards = [
  { label: { pt: 'Agentes Ativos', fr: 'Agents Actifs' }, value: '247', gradient: 'from-sky-400 to-blue-600', delay: 0 },
  { label: { pt: 'Processos/Dia', fr: 'Processus/Jour' }, value: '1.8K', gradient: 'from-purple-600 to-fuchsia-600', delay: 1.5 },
  { label: { pt: 'Economia Mensal', fr: 'Économies/Mois' }, value: 'R$94K', gradient: 'from-sky-400 to-purple-600', delay: 0.8 },
  { label: { pt: 'Uptime Global', fr: 'Disponibilité' }, value: '99.9%', gradient: 'from-fuchsia-500 to-purple-600', delay: 2 },
]

export default function Hero({ lang }: { lang: Lang }) {
  const t = translations[lang].hero
  const waMsg = encodeURIComponent(translations[lang].whatsapp.heroMessage)
  const waHref = `https://wa.me/${WA_NUMBER}?text=${waMsg}`

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-sky-400 font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            {t.badge}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
          >
            {t.title}{' '}
            <span className="gradient-text">{t.titleHighlight}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/60 leading-relaxed mb-3 max-w-xl"
          >
            {t.subtitle}
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base text-white/40 leading-relaxed mb-10 max-w-xl"
          >
            {t.text}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              onClick={() => scrollTo('contato')}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="btn-gradient text-white px-8 py-4 rounded-full font-semibold text-base shadow-[0_0_40px_rgba(56,189,248,0.3)] hover:shadow-[0_0_60px_rgba(147,51,234,0.5)] transition-all duration-300"
            >
              {t.cta1}
            </motion.button>
            <motion.a
              href={waHref} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-semibold text-base border border-white/20 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.cta2}
            </motion.a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex items-center gap-8 flex-wrap"
          >
            {t.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-[520px] lg:h-[600px]"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-purple-600 rounded-full blur-3xl opacity-20 scale-150 animate-glow-pulse" />
              <div className="relative w-36 h-36 rounded-full bg-gradient-to-r from-sky-400/20 to-purple-600/20 border border-white/10 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-sky-400 to-purple-600 animate-glow-pulse flex items-center justify-center">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
              </div>
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div key={i} className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-sky-400 to-purple-600"
                  style={{ top: '50%', left: '50%', transform: `rotate(${deg}deg) translateX(90px) translateY(-50%)`, opacity: 0.5 + i * 0.06 }}
                />
              ))}
            </div>
          </div>

          {floatCards.map((card, i) => {
            const positions = ['top-6 right-0', 'bottom-16 right-0', 'top-24 left-0', 'bottom-6 left-4']
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                style={{ animation: `float ${5 + i}s ease-in-out ${card.delay}s infinite` }}
                className={`absolute ${positions[i]} glass-card p-4 min-w-[155px] hover:border-sky-400/30 transition-colors duration-300`}
              >
                <div className={`text-xs font-medium bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent mb-1`}>
                  {card.label[lang]}
                </div>
                <div className="text-2xl font-bold text-white">{card.value}</div>
                <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${card.gradient} rounded-full`} style={{ width: `${65 + i * 8}%` }} />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
        </motion.div>
      </div>
    </section>
  )
}
