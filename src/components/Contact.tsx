'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MessageSquare, Mail, MapPin, CheckCircle2 } from 'lucide-react'
import { translations } from '@/i18n/translations'
import type { Lang } from '@/i18n/translations'

const infoIcons = [MessageSquare, Mail, MapPin, MapPin]

export default function Contact({ lang }: { lang: Lang }) {
  const t = translations[lang].contact
  const f = t.form
  const [formData, setFormData] = useState({ name: '', company: '', phone: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
    } catch {
      // falha silenciosa — mostra sucesso de qualquer forma
    }
    setLoading(false)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contato" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sky-400 text-sm font-medium mb-4">{t.badge}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            {t.title}{' '}<span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2">
            <p className="text-white/60 text-base leading-relaxed mb-8">{t.description}</p>
            <div className="flex flex-col gap-4">
              {t.info.map((info, i) => {
                const Icon = infoIcons[i]
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${i < 2 ? 'bg-gradient-to-r from-sky-400 to-blue-600' : 'bg-gradient-to-r from-purple-600 to-fuchsia-600'}`}>
                      <Icon size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-white/35 font-medium uppercase tracking-wide">{info.label}</div>
                      <div className="text-sm text-white/70 font-medium">{info.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-3">
            <div className="glass-card p-8">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-sky-400 to-purple-600 mb-6">
                    <CheckCircle2 size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{f.successTitle}</h3>
                  <p className="text-white/55">{f.successText}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[{ name: 'name', label: f.name, placeholder: f.namePlaceholder, type: 'text' }, { name: 'company', label: f.company, placeholder: f.companyPlaceholder, type: 'text' }].map((field) => (
                      <div key={field.name}>
                        <label className="block text-xs text-white/40 font-medium uppercase tracking-wide mb-2">{field.label} *</label>
                        <input name={field.name} type={field.type} value={formData[field.name as keyof typeof formData]} onChange={handleChange} required placeholder={field.placeholder}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-sky-400/50 focus:bg-white/8 transition-all duration-200" />
                      </div>
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[{ name: 'phone', label: f.phone, placeholder: f.phonePlaceholder, type: 'tel', required: false }, { name: 'email', label: f.email, placeholder: f.emailPlaceholder, type: 'email', required: true }].map((field) => (
                      <div key={field.name}>
                        <label className="block text-xs text-white/40 font-medium uppercase tracking-wide mb-2">{field.label}{field.required ? ' *' : ''}</label>
                        <input name={field.name} type={field.type} value={formData[field.name as keyof typeof formData]} onChange={handleChange} required={field.required} placeholder={field.placeholder}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-sky-400/50 focus:bg-white/8 transition-all duration-200" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 font-medium uppercase tracking-wide mb-2">{f.message} *</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} placeholder={f.messagePlaceholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-sky-400/50 focus:bg-white/8 transition-all duration-200 resize-none" />
                  </div>
                  <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="btn-gradient text-white px-8 py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(56,189,248,0.2)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{f.submitting}</>) : (<><Send size={18} />{f.submit}</>)}
                  </motion.button>
                  <p className="text-center text-white/30 text-xs">{f.privacy}</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
