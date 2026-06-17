import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Volvera Solutions | Inteligência Artificial e Automação Empresarial',
  description:
    'Transformamos empresas com IA, automação de processos, agentes inteligentes, WhatsApp Business API e dashboards de dados. Reduza custos e escale seu negócio.',
  keywords: [
    'inteligência artificial',
    'automação de processos',
    'agentes de IA',
    'WhatsApp Business API',
    'dashboards de dados',
    'transformação digital',
    'integração empresarial',
    'Volvera Solutions',
  ],
  authors: [{ name: 'Volvera Solutions' }],
  creator: 'Volvera Solutions',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://Volverasolutions.com.br',
    siteName: 'Volvera Solutions',
    title: 'Volvera Solutions | IA e Automação para Empresas',
    description:
      'Transforme seu negócio com Inteligência Artificial de última geração. Automação, agentes IA, integrações e dashboards.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Volvera Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Volvera Solutions | IA e Automação Empresarial',
    description: 'Transforme seu negócio com IA e automação de última geração.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#050505" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Volvera Solutions',
              url: 'https://Volverasolutions.com.br',
              logo: 'https://Volverasolutions.com.br/logo.png',
              description:
                'Especialistas em Inteligência Artificial, Automação de Processos e Transformação Digital.',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                availableLanguage: 'Portuguese',
              },
            }),
          }}
        />
      </head>
      <body className="bg-[#050505] text-white antialiased" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
