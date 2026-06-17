import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ClientPage from './ClientPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateStaticParams() {
  return [{ lang: 'pt' }, { lang: 'fr' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const isPt = lang === 'pt'
  return {
    title: isPt
      ? 'Volvera Solutions | Inteligência Artificial e Automação Empresarial'
      : 'Volvera Solutions | Intelligence Artificielle et Automatisation',
    description: isPt
      ? 'Transformamos empresas no Brasil e na França com IA, automação e integrações empresariais. Reduza custos e escale seu negócio.'
      : "Nous transformons les entreprises au Brésil et en France avec l'IA, l'automatisation et les intégrations. Réduisez les coûts et faites évoluer votre activité.",
    alternates: {
      canonical: `https://volverasolutions.com.br/${lang}`,
      languages: { 'pt-BR': '/pt', 'fr-FR': '/fr' },
    },
  }
}

export default async function LangPage({ params }: Props) {
  const { lang } = await params
  if (lang !== 'pt' && lang !== 'fr') notFound()
  return <ClientPage lang={lang as 'pt' | 'fr'} />
}
