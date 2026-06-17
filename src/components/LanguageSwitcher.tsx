'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { Lang } from '@/i18n/translations'

const langs: { code: Lang; src: string; alt: string }[] = [
  { code: 'pt', src: '/flag-br.webp', alt: 'Português - Brasil' },
  { code: 'fr', src: '/flag-fr.jpeg', alt: 'Français - France' },
]

export default function LanguageSwitcher({ lang }: { lang: Lang }) {
  const router = useRouter()

  return (
    <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10">
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => router.push(`/${l.code}`)}
          title={l.alt}
          className={`relative w-8 h-8 rounded-full overflow-hidden transition-all duration-200 ${
            lang === l.code
              ? 'ring-2 ring-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.5)] scale-110'
              : 'opacity-40 hover:opacity-80 hover:scale-105'
          }`}
        >
          <Image src={l.src} alt={l.alt} fill className="object-cover" />
        </button>
      ))}
    </div>
  )
}
