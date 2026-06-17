'use client'

import { motion } from 'framer-motion'
import { translations } from '@/i18n/translations'
import type { Lang } from '@/i18n/translations'

const ARC_PATH = 'M 160,310 C 200,120 560,100 640,170'

export default function GlobalMap({ lang }: { lang: Lang }) {
  const t = translations[lang].globalMap

  return (
    <section id="global" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sky-400 text-sm font-medium mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            <span className="gradient-text">{t.title}</span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-card p-8 lg:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 via-transparent to-purple-950/20 rounded-2xl" />

            <svg
              viewBox="0 0 800 480"
              className="w-full max-h-[420px]"
              style={{ filter: 'drop-shadow(0 0 20px rgba(56,189,248,0.1))' }}
            >
              <defs>
                <radialGradient id="brazilGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="franceGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#9333EA" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#9333EA" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#9333EA" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#C026D3" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <path id="arcTrack" d={ARC_PATH} fill="none" />
              </defs>

              {/* Grid dots */}
              {Array.from({ length: 20 }).map((_, row) =>
                Array.from({ length: 32 }).map((_, col) => (
                  <circle
                    key={`${row}-${col}`}
                    cx={col * 26 + 13}
                    cy={row * 24 + 12}
                    r="1"
                    fill="rgba(255,255,255,0.06)"
                  />
                ))
              )}

              {/* Meridian lines */}
              {[160, 280, 400, 520, 640].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="480" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              ))}
              {[120, 240, 360].map((y) => (
                <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              ))}

              {/* Americas blob */}
              <ellipse cx="200" cy="250" rx="100" ry="160" fill="rgba(56,189,248,0.04)" stroke="rgba(56,189,248,0.08)" strokeWidth="1" />
              {/* Europe/Africa blob */}
              <ellipse cx="500" cy="240" rx="80" ry="140" fill="rgba(147,51,234,0.04)" stroke="rgba(147,51,234,0.08)" strokeWidth="1" />
              {/* Asia blob */}
              <ellipse cx="660" cy="200" rx="110" ry="120" fill="rgba(192,38,211,0.03)" stroke="rgba(192,38,211,0.06)" strokeWidth="1" />

              {/* Arc shadow */}
              <path d={ARC_PATH} fill="none" stroke="rgba(56,189,248,0.08)" strokeWidth="8" />
              {/* Main arc */}
              <path d={ARC_PATH} fill="none" stroke="url(#arcGrad)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />

              {/* Animated particles along arc */}
              {[0, 0.33, 0.66].map((offset, i) => (
                <circle key={i} r="3.5" fill="#38BDF8" filter="url(#glow)" opacity="0.9">
                  <animateMotion
                    dur={`${3 + i * 0.8}s`}
                    begin={`${offset * 3}s`}
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href="#arcTrack" />
                  </animateMotion>
                </circle>
              ))}
              <circle r="2.5" fill="#C026D3" filter="url(#glow)" opacity="0.8">
                <animateMotion dur="4s" begin="1.5s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#arcTrack" />
                </animateMotion>
              </circle>

              {/* Brazil glow */}
              <circle cx="160" cy="310" r="40" fill="url(#brazilGlow)" />
              <circle cx="160" cy="310" r="16" fill="rgba(56,189,248,0.12)" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
              <circle cx="160" cy="310" r="8" fill="rgba(56,189,248,0.3)" stroke="#38BDF8" strokeWidth="1.5" filter="url(#glow)">
                <animate attributeName="r" values="8;11;8" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="160" cy="310" r="4" fill="#38BDF8" filter="url(#glow)" />

              {/* France glow */}
              <circle cx="640" cy="170" r="40" fill="url(#franceGlow)" />
              <circle cx="640" cy="170" r="16" fill="rgba(147,51,234,0.12)" stroke="rgba(147,51,234,0.3)" strokeWidth="1" />
              <circle cx="640" cy="170" r="8" fill="rgba(147,51,234,0.3)" stroke="#9333EA" strokeWidth="1.5" filter="url(#glow)">
                <animate attributeName="r" values="8;11;8" dur="3s" begin="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="640" cy="170" r="4" fill="#9333EA" filter="url(#glow)" />

              {/* Brazil label */}
              <text x="160" y="345" textAnchor="middle" fill="white" fontSize="13" fontWeight="600" opacity="0.9">🇧🇷 {t.brazil}</text>
              <text x="160" y="362" textAnchor="middle" fill="rgba(56,189,248,0.7)" fontSize="10">São Paulo</text>

              {/* France label */}
              <text x="640" y="148" textAnchor="middle" fill="white" fontSize="13" fontWeight="600" opacity="0.9">🇫🇷 {t.france}</text>
              <text x="640" y="132" textAnchor="middle" fill="rgba(147,51,234,0.7)" fontSize="10">Cognac</text>

              {/* Connection label */}
              <text x="400" y="108" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" letterSpacing="2">
                {t.connectionLabel}
              </text>
            </svg>
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              { flag: '🇧🇷', label: lang === 'pt' ? 'Brasil' : 'Brésil', sub: 'São Paulo, SP', color: 'from-sky-400 to-blue-600' },
              { flag: '🌐', label: lang === 'pt' ? 'Conectividade Global' : 'Connectivité Mondiale', sub: '24/7 Online', color: 'from-sky-400 to-purple-600' },
              { flag: '🇫🇷', label: lang === 'pt' ? 'França' : 'France', sub: 'Cognac, Charente', color: 'from-purple-600 to-fuchsia-600' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="glass-card p-5 text-center"
              >
                <div className="text-3xl mb-2">{item.flag}</div>
                <div className={`font-semibold text-sm bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>{item.label}</div>
                <div className="text-white/40 text-xs mt-1">{item.sub}</div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-8 text-white/30 text-sm italic"
          >
            {t.slogan}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
