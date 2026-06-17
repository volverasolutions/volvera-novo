import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, company, phone, email, message } = await request.json()

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Volvera Solutions Site" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Novo contato do site - ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#0ea5e9">Novo contato via site Volvera Solutions</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;color:#666;width:120px"><strong>Nome</strong></td><td style="padding:8px">${name}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px;color:#666"><strong>Empresa</strong></td><td style="padding:8px">${company || '-'}</td></tr>
            <tr><td style="padding:8px;color:#666"><strong>Telefone</strong></td><td style="padding:8px">${phone || '-'}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px;color:#666"><strong>E-mail</strong></td><td style="padding:8px">${email}</td></tr>
            <tr><td style="padding:8px;color:#666;vertical-align:top"><strong>Mensagem</strong></td><td style="padding:8px">${message}</td></tr>
          </table>
          <p style="color:#999;font-size:12px;margin-top:24px">Volvera Solutions · volverasolutions@gmail.com</p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact email error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
