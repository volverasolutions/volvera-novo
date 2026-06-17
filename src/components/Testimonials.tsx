'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { translations } from '@/i18n/translations'
import type { Lang } from '@/i18n/translations'

function Avatar({ name, gradient }: { name: string; gradient: string }) {
  const initials = name.split(' ').map((n) => n[0]).slice(0, 2).join('')
  return (
    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
      {initials}
    </div>
  )
}

const gradients = ['from-sky-400 to-blue-600', 'from-purple-600 to-fuchsia-600', 'from-sky-400 to-purple-600']

export default function Testimonials({ lang }: { lang: Lang }) {
  const t = translations[lang].testimonials

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/8 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-purple-400 text-sm font-medium mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            {t.title}{' '}
            <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {t.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card p-7 flex flex-col gap-5 group hover:border-white/20 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: item.rating }).map((_, s) => (
                  <Star key={s} size={14} className="fill-sky-400 text-sky-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-white/65 text-sm leading-relaxed flex-1">
                <span className="text-sky-400 text-2xl font-serif leading-none mr-1">"</span>
                {item.text}
                <span className="text-sky-400 text-2xl font-serif leading-none ml-1">"</span>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-white/8 pt-5">
                <Avatar name={item.name} gradient={gradients[i]} />
                <div>
                  <div className="text-white font-semibold text-sm">{item.name}</div>
                  <div className="text-white/45 text-xs mt-0.5">{item.country}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
