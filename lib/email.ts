import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
  return _resend
}

const FROM = process.env.EMAIL_FROM || 'Unaria <noreply@unaria.org>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL_NOTIFICATIONS || 'admin@unaria.org'

export interface WelcomeEmailData {
  name: string
  email: string
  quota: number
  locale: string
}

export interface ReceiptEmailData {
  name: string
  email: string
  amount: number
  type: 'subscription' | 'one_time'
  locale: string
}

export interface CancellationEmailData {
  name: string
  email: string
  locale: string
}

export interface TransferNotificationData {
  ngoName: string
  amount: number
  transferDate: string
  reference?: string
}

const subjects: Record<string, Record<string, string>> = {
  welcome: { ca: 'Benvingut/da a Unaria', es: 'Bienvenido/a a Unaria', en: 'Welcome to Unaria', fr: 'Bienvenue chez Unaria', de: 'Willkommen bei Unaria' },
  receipt: { ca: 'Confirmació de pagament - Unaria', es: 'Confirmación de pago - Unaria', en: 'Payment confirmation - Unaria', fr: 'Confirmation de paiement - Unaria', de: 'Zahlungsbestätigung - Unaria' },
  cancel: { ca: 'Confirmació de baixa - Unaria', es: 'Confirmación de baja - Unaria', en: 'Cancellation confirmation - Unaria', fr: "Confirmation d'annulation - Unaria", de: 'Kündigungsbestätigung - Unaria' },
}

function buildWelcomeHtml(data: WelcomeEmailData): string {
  const greetings: Record<string, string> = {
    ca: `Hola ${data.name},<br><br>Gràcies per fer-te soci/a d'Unaria. La teva quota mensual de <strong>${data.quota}€</strong> contribuirà a generar un impacte real i mesurable.<br><br>Pots consultar el progrés dels nostres fons i les transferències a ONG a la nostra pàgina de transparència.`,
    es: `Hola ${data.name},<br><br>Gracias por hacerte socio/a de Unaria. Tu cuota mensual de <strong>${data.quota}€</strong> contribuirá a generar un impacto real y medible.<br><br>Puedes consultar el progreso de nuestros fondos y las transferencias a ONG en nuestra página de transparencia.`,
    en: `Hello ${data.name},<br><br>Thank you for becoming a member of Unaria. Your monthly fee of <strong>€${data.quota}</strong> will contribute to generating real, measurable impact.<br><br>You can track our funds and NGO transfers on our transparency page.`,
    fr: `Bonjour ${data.name},<br><br>Merci de devenir membre d'Unaria. Votre cotisation mensuelle de <strong>${data.quota}€</strong> contribuera à générer un impact réel et mesurable.<br><br>Vous pouvez suivre l'évolution de nos fonds et les transferts aux ONG sur notre page de transparence.`,
    de: `Hallo ${data.name},<br><br>Vielen Dank für Ihre Mitgliedschaft bei Unaria. Ihr monatlicher Beitrag von <strong>${data.quota}€</strong> wird dazu beitragen, eine echte und messbare Wirkung zu erzielen.<br><br>Sie können unsere Finanzen und NGO-Überweisungen auf unserer Transparenzseite verfolgen.`,
  }
  return emailTemplate(greetings[data.locale] ?? greetings.en)
}

function buildReceiptHtml(data: ReceiptEmailData): string {
  const texts: Record<string, string> = {
    ca: `Hola ${data.name},<br><br>Hem rebut correctament el teu pagament de <strong>${data.amount}€</strong>. Gràcies per la teva contribució a Unaria.`,
    es: `Hola ${data.name},<br><br>Hemos recibido correctamente tu pago de <strong>${data.amount}€</strong>. Gracias por tu contribución a Unaria.`,
    en: `Hello ${data.name},<br><br>We have successfully received your payment of <strong>€${data.amount}</strong>. Thank you for your contribution to Unaria.`,
    fr: `Bonjour ${data.name},<br><br>Nous avons bien reçu votre paiement de <strong>${data.amount}€</strong>. Merci pour votre contribution à Unaria.`,
    de: `Hallo ${data.name},<br><br>Wir haben Ihre Zahlung von <strong>${data.amount}€</strong> erfolgreich erhalten. Vielen Dank für Ihren Beitrag zu Unaria.`,
  }
  return emailTemplate(texts[data.locale] ?? texts.en)
}

function buildCancellationHtml(data: CancellationEmailData): string {
  const texts: Record<string, string> = {
    ca: `Hola ${data.name},<br><br>La teva baixa com a soci/a d'Unaria ha estat tramitada correctament. Gràcies per la teva contribució.`,
    es: `Hola ${data.name},<br><br>Tu baja como socio/a de Unaria ha sido tramitada correctamente. Gracias por tu contribución.`,
    en: `Hello ${data.name},<br><br>Your Unaria membership cancellation has been processed. Thank you for your contribution.`,
    fr: `Bonjour ${data.name},<br><br>Votre résiliation d'adhésion Unaria a été traitée. Merci pour votre contribution.`,
    de: `Hallo ${data.name},<br><br>Ihre Kündigung der Unaria-Mitgliedschaft wurde bearbeitet. Vielen Dank für Ihren Beitrag.`,
  }
  return emailTemplate(texts[data.locale] ?? texts.en)
}

function emailTemplate(content: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:Inter,Arial,sans-serif;background:#f8f9fa;margin:0;padding:0">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fa;padding:40px 0">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
<tr><td style="background:#1B4F72;padding:32px 40px;text-align:center">
<h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700">UNARIA</h1>
<p style="color:#a8d4f0;margin:4px 0 0;font-size:13px">unaria.org</p>
</td></tr>
<tr><td style="padding:40px;color:#2c3e50;font-size:15px;line-height:1.6">${content}</td></tr>
<tr><td style="background:#f8f9fa;padding:24px 40px;border-top:1px solid #e9ecef">
<p style="color:#6c757d;font-size:12px;margin:0;text-align:center">
Unaria · Associació sense ànim de lucre · Barcelona, Catalunya<br>
<a href="https://unaria.org" style="color:#1B4F72">unaria.org</a> ·
<a href="https://unaria.org/ca/privacy-policy" style="color:#1B4F72">Política de Privacitat</a>
</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`
}

export async function sendWelcomeEmail(data: WelcomeEmailData) {
  const subject = subjects.welcome[data.locale] ?? subjects.welcome.en
  await getResend().emails.send({
    from: FROM,
    to: data.email,
    subject,
    html: buildWelcomeHtml(data),
  })
}

export async function sendReceiptEmail(data: ReceiptEmailData) {
  const subject = subjects.receipt[data.locale] ?? subjects.receipt.en
  await getResend().emails.send({
    from: FROM,
    to: data.email,
    subject,
    html: buildReceiptHtml(data),
  })
}

export async function sendCancellationEmail(data: CancellationEmailData) {
  const subject = subjects.cancel[data.locale] ?? subjects.cancel.en
  await getResend().emails.send({
    from: FROM,
    to: data.email,
    subject,
    html: buildCancellationHtml(data),
  })
}

export async function sendAdminPaymentNotification(data: {
  type: 'donation' | 'subscription'
  name: string
  email: string
  amount: number
}) {
  const typeLabel = data.type === 'subscription' ? 'Nova subscripció (soci)' : 'Nova donació puntual'
  const html = emailTemplate(
    `<strong>${typeLabel}</strong><br><br>
     Nom: <strong>${data.name}</strong><br>
     Email: <strong>${data.email}</strong><br>
     Import: <strong>${data.amount}€${data.type === 'subscription' ? '/mes' : ''}</strong><br><br>
     <a href="https://dashboard.stripe.com" style="color:#1B4F72">Veure a Stripe Dashboard →</a>`
  )
  await getResend().emails.send({
    from: FROM,
    to: 'unariabcn@gmail.com',
    subject: `[Unaria] ${typeLabel} – ${data.name} (${data.amount}€)`,
    html,
  })
}

export async function sendTransferNotification(data: TransferNotificationData) {
  const html = emailTemplate(
    `<strong>Nova transferència a ONG registrada</strong><br><br>
     ONG: <strong>${data.ngoName}</strong><br>
     Import: <strong>${data.amount}€</strong><br>
     Data: <strong>${data.transferDate}</strong><br>
     ${data.reference ? `Referència: <strong>${data.reference}</strong>` : ''}`
  )
  await getResend().emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: '[Unaria] Nova transferència a ONG registrada',
    html,
  })
}
