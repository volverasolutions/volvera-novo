import { NextRequest, NextResponse } from 'next/server'

const INSTANCE_ID = process.env.ZAPI_INSTANCE_ID ?? ''
const TOKEN = process.env.ZAPI_TOKEN ?? ''
const ZAPI_URL = `https://api.z-api.io/instances/${INSTANCE_ID}/token/${TOKEN}`

type State = 'lang_choice' | 'pt_menu' | 'fr_menu' | 'pt_open' | 'fr_open'
const sessions = new Map<string, { state: State }>()

const SIG = `\n\n━━━━━━━━━━━━━━━━━━━━━━━\nVOLVERA SOLUTIONS\n🌍 Conectando Empresas. Integrando o Mundo. Potencializando o Futuro.\n🇧🇷 Brasil | 🇫🇷 France\n📱 +33 7 46 33 31 03\n🤖 Inteligência Artificial • Automação • Integrações Empresariais`

const MSG = {
  welcome:
    `🇧🇷 Bem-vindo à Volvera Solutions!\n\nObrigado por entrar em contato.\n\nPara continuar seu atendimento, escolha o idioma desejado:\n\n1️⃣ Português (Brasil)\n2️⃣ Français\n\nDigite apenas o número da opção desejada.\n\n━━━━━━━━━━━━━━━━━━━━━━━\n\n🇫🇷 Bienvenue chez Volvera Solutions !\n\nMerci de nous avoir contactés.\n\nPour continuer votre assistance, veuillez choisir votre langue :\n\n1️⃣ Português (Brésil)\n2️⃣ Français\n\nVeuillez saisir uniquement le numéro correspondant à votre choix.` + SIG,

  pt: {
    menu:
      `🇧🇷 Olá! Seja bem-vindo(a) à Volvera Solutions.\n\nSomos especialistas em Inteligência Artificial, Automação de Processos, Integrações Empresariais e Transformação Digital.\n\nComo podemos ajudá-lo hoje? Escolha uma opção:\n\n1️⃣ Conhecer nossos serviços\n2️⃣ Solicitar um diagnóstico gratuito\n3️⃣ Automatizar minha empresa\n4️⃣ Falar com um especialista\n5️⃣ Outro assunto\n\nOu descreva sua necessidade em uma mensagem.` + SIG,
    opt1:
      `Conheça nossas soluções:\n\n✅ Agentes de IA\n✅ Automação de Processos\n✅ Integrações Empresariais\n✅ WhatsApp Inteligente\n✅ Dashboards e BI\n✅ Consultoria em IA\n\nQual dessas soluções mais interessa você?` + SIG,
    opt2:
      `Excelente escolha.\n\nPara realizar seu diagnóstico gratuito, informe:\n\n• Nome\n• Empresa\n• Segmento\n• Principal desafio atual\n\nNossa equipe retornará o mais rápido possível.` + SIG,
    opt3:
      `Perfeito.\n\nConte-nos quais atividades da sua empresa você gostaria de automatizar.\n\nNossa equipe analisará as melhores oportunidades de automação para seu negócio.` + SIG,
    opt4:
      `Um especialista da Volvera Solutions irá atendê-lo em breve.\n\nEnquanto isso, descreva sua necessidade para agilizar seu atendimento.` + SIG,
    opt5:
      `Certo! Por favor, descreva sua necessidade e nossa equipe entrará em contato em breve.` + SIG,
    fallback:
      `Recebemos sua mensagem. Nossa equipe entrará em contato em breve.\n\nSe preferir, escolha uma das opções do menu:\n\n1️⃣ Conhecer nossos serviços\n2️⃣ Solicitar um diagnóstico gratuito\n3️⃣ Automatizar minha empresa\n4️⃣ Falar com um especialista\n5️⃣ Outro assunto` + SIG,
  },

  fr: {
    menu:
      `🇫🇷 Bonjour et bienvenue chez Volvera Solutions.\n\nNous sommes spécialisés dans l'Intelligence Artificielle, l'Automatisation des Processus, les Intégrations d'Entreprises et la Transformation Digitale.\n\nComment pouvons-nous vous aider aujourd'hui ? Choisissez une option :\n\n1️⃣ Découvrir nos services\n2️⃣ Demander un diagnostic gratuit\n3️⃣ Automatiser mon entreprise\n4️⃣ Parler à un spécialiste\n5️⃣ Autre sujet\n\nOu décrivez directement votre besoin dans un message.` + SIG,
    opt1:
      `Découvrez nos solutions :\n\n✅ Agents IA\n✅ Automatisation des Processus\n✅ Intégrations d'Entreprise\n✅ WhatsApp Intelligent\n✅ Tableaux de Bord et BI\n✅ Conseil en Intelligence Artificielle\n\nQuelle solution vous intéresse le plus ?` + SIG,
    opt2:
      `Excellent choix.\n\nPour réaliser votre diagnostic gratuit, merci de nous indiquer :\n\n• Nom\n• Entreprise\n• Secteur d'activité\n• Principal défi actuel\n\nNotre équipe vous répondra dans les meilleurs délais.` + SIG,
    opt3:
      `Parfait.\n\nDécrivez-nous les tâches ou processus que vous souhaitez automatiser.\n\nNos spécialistes analyseront les meilleures opportunités pour votre entreprise.` + SIG,
    opt4:
      `Un spécialiste Volvera Solutions vous répondra très prochainement.\n\nEn attendant, veuillez décrire votre besoin afin d'accélérer votre prise en charge.` + SIG,
    opt5:
      `Bien sûr ! Décrivez votre besoin et notre équipe vous contactera très prochainement.` + SIG,
    fallback:
      `Nous avons bien reçu votre message. Notre équipe vous contactera prochainement.\n\nSi vous préférez, choisissez une option du menu :\n\n1️⃣ Découvrir nos services\n2️⃣ Demander un diagnostic gratuit\n3️⃣ Automatiser mon entreprise\n4️⃣ Parler à un spécialiste\n5️⃣ Autre sujet` + SIG,
  },
}

function getReply(from: string, text: string): string {
  const session = sessions.get(from) ?? { state: 'lang_choice' as State }
  const input = text.trim()

  if (session.state === 'lang_choice') {
    if (input === '1') { sessions.set(from, { state: 'pt_menu' }); return MSG.pt.menu }
    if (input === '2') { sessions.set(from, { state: 'fr_menu' }); return MSG.fr.menu }
    sessions.set(from, { state: 'lang_choice' })
    return MSG.welcome
  }

  if (session.state === 'pt_menu') {
    if (input === '1') { sessions.set(from, { state: 'pt_open' }); return MSG.pt.opt1 }
    if (input === '2') { sessions.set(from, { state: 'pt_open' }); return MSG.pt.opt2 }
    if (input === '3') { sessions.set(from, { state: 'pt_open' }); return MSG.pt.opt3 }
    if (input === '4') { sessions.set(from, { state: 'pt_open' }); return MSG.pt.opt4 }
    if (input === '5') { sessions.set(from, { state: 'pt_open' }); return MSG.pt.opt5 }
    sessions.set(from, { state: 'pt_open' })
    return MSG.pt.fallback
  }

  if (session.state === 'fr_menu') {
    if (input === '1') { sessions.set(from, { state: 'fr_open' }); return MSG.fr.opt1 }
    if (input === '2') { sessions.set(from, { state: 'fr_open' }); return MSG.fr.opt2 }
    if (input === '3') { sessions.set(from, { state: 'fr_open' }); return MSG.fr.opt3 }
    if (input === '4') { sessions.set(from, { state: 'fr_open' }); return MSG.fr.opt4 }
    if (input === '5') { sessions.set(from, { state: 'fr_open' }); return MSG.fr.opt5 }
    sessions.set(from, { state: 'fr_open' })
    return MSG.fr.fallback
  }

  if (session.state === 'pt_open') return MSG.pt.fallback
  if (session.state === 'fr_open') return MSG.fr.fallback

  sessions.set(from, { state: 'lang_choice' })
  return MSG.welcome
}

async function send(phone: string, message: string) {
  await fetch(`${ZAPI_URL}/send-text`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, message }),
  })
}

// Z-API não requer verificação GET
export async function GET() {
  return NextResponse.json({ status: 'Volvera WhatsApp Webhook ativo' })
}

// Recebe mensagens da Z-API (POST)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Ignorar mensagens enviadas por nós mesmos
    if (body.fromMe) return NextResponse.json({ status: 'ok' })

    // Z-API envia o número no campo "phone"
    const phone: string = body.phone
    const text: string = body.text?.message ?? ''

    if (!phone || !text) return NextResponse.json({ status: 'ok' })

    const isNew = !sessions.has(phone)

    if (isNew) {
      sessions.set(phone, { state: 'lang_choice' })
      await send(phone, MSG.welcome)
      return NextResponse.json({ status: 'ok' })
    }

    const reply = getReply(phone, text)
    await send(phone, reply)

    return NextResponse.json({ status: 'ok' })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}
