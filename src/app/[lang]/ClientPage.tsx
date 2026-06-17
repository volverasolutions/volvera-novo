'use client'

import dynamic from 'next/dynamic'
import type { Lang } from '@/i18n/translations'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Differentials from '@/components/Differentials'
import HowItWorks from '@/components/HowItWorks'
import GlobalMap from '@/components/GlobalMap'
import Benefits from '@/components/Benefits'
import Cases from '@/components/Cases'
import Testimonials from '@/components/Testimonials'
import About from '@/components/About'
import FAQ from '@/components/FAQ'
import CTASection from '@/components/CTASection'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), { ssr: false })

export default function ClientPage({ lang }: { lang: Lang }) {
  return (
    <main className="relative bg-[#050505] min-h-screen">
      <ParticleBackground />
      <Header lang={lang} />
      <Hero lang={lang} />
      <Services lang={lang} />
      <Differentials lang={lang} />
      <HowItWorks lang={lang} />
      <GlobalMap lang={lang} />
      <Benefits lang={lang} />
      <Cases lang={lang} />
      <Testimonials lang={lang} />
      <About lang={lang} />
      <FAQ lang={lang} />
      <CTASection lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
      <WhatsAppButton lang={lang} />
    </main>
  )
}
