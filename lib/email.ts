import { Resend } from 'resend'
import { generateManageToken } from './token'

let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
  return _resend
}

const FROM = process.env.EMAIL_FROM || 'Unaria <unariabcn@gmail.com>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL_NOTIFICATIONS || 'unariabcn@gmail.com'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://unaria.org'

export interface WelcomeEmailData {
  name: string
  email: string
  quota: number
  locale: string
  memberId?: string
}

export interface ReceiptEmailData {
  name: string
  email: string
  amount: number
  type: 'subscription' | 'one_time'
  locale: string
}

export interface MonthlyReceiptEmailData {
  name: string
  email: string
  amount: number
  locale: string
  invoiceDate?: string
  memberId?: string
}

export interface PaymentFailedEmailData {
  name: string
  email: string
  amount: number
  locale: string
  updatePaymentUrl?: string
}

export interface CancellationEmailData {
  name: string
  email: string
  locale: string
}

export interface PauseEmailData {
  name: string
  email: string
  locale: string
  resumesAt: Date
  memberId: string
  token: string
}

export interface WinbackEmailData {
  name: string
  email: string
  locale: string
  memberId: string
  token: string
}

export interface ReferralJoinedEmailData {
  referrerName: string
  referrerEmail: string
  locale: string
  newMemberName: string
}

export interface AnnualTransparencyEmailData {
  name: string
  email: string
  locale: string
  year: number
  totalTransferred: number
  ngoNames: string[]
  totalMembers: number
  personalContribution: number
}

export interface TransferNotificationData {
  ngoName: string
  amount: number
  transferDate: string
  reference?: string
}

const subjects: Record<string, Record<string, string>> = {
  welcome: {
    ca: "Benvingut/da a Unaria — el teu impacte comença avui",
    es: "Bienvenido/a a Unaria — tu impacto empieza hoy",
    en: "Welcome to Unaria — your impact starts today",
    fr: "Bienvenue chez Unaria — votre impact commence aujourd'hui",
    de: "Willkommen bei Unaria — deine Wirkung beginnt heute",
  },
  receipt: {
    ca: 'Confirmació de pagament - Unaria',
    es: 'Confirmación de pago - Unaria',
    en: 'Payment confirmation - Unaria',
    fr: 'Confirmation de paiement - Unaria',
    de: 'Zahlungsbestätigung - Unaria',
  },
  monthlyReceipt: {
    ca: 'Quota mensual rebuda - Unaria',
    es: 'Cuota mensual recibida - Unaria',
    en: 'Monthly fee received - Unaria',
    fr: 'Cotisation mensuelle reçue - Unaria',
    de: 'Monatsbeitrag erhalten - Unaria',
  },
  paymentFailed: {
    ca: 'Acció necessària: problema amb el teu pagament',
    es: 'Acción necesaria: problema con tu pago',
    en: 'Action required: payment issue',
    fr: 'Action requise : problème de paiement',
    de: 'Handlung erforderlich: Zahlungsproblem',
  },
  cancel: {
    ca: 'Confirmació de baixa - Unaria',
    es: 'Confirmación de baja - Unaria',
    en: 'Cancellation confirmation - Unaria',
    fr: "Confirmation d'annulation - Unaria",
    de: 'Kündigungsbestätigung - Unaria',
  },
  pause: {
    ca: 'Subscripció pausada — Tornem aviat',
    es: 'Suscripción pausada — Volvemos pronto',
    en: 'Subscription paused — See you soon',
    fr: 'Abonnement mis en pause — À bientôt',
    de: 'Abonnement pausiert — Bis bald',
  },
  winback: {
    ca: "T'enyorem — Torna a Unaria",
    es: 'Te echamos de menos — Vuelve a Unaria',
    en: 'We miss you — Come back to Unaria',
    fr: 'Vous nous manquez — Revenez chez Unaria',
    de: 'Wir vermissen dich — Komm zurück zu Unaria',
  },
  referralJoined: {
    ca: "El teu amic s'acaba de fer soci d'Unaria!",
    es: '¡Tu amigo acaba de hacerse socio de Unaria!',
    en: 'Your friend just joined Unaria!',
    fr: 'Votre ami vient de rejoindre Unaria !',
    de: 'Dein Freund ist gerade Mitglied bei Unaria geworden!',
  },
  annualTransparency: {
    ca: 'La memòria anual d\'Unaria ja és aquí',
    es: 'La memoria anual de Unaria ya está aquí',
    en: 'Unaria\'s annual transparency report is here',
    fr: 'Le rapport annuel d\'Unaria est disponible',
    de: 'Unarías Jahresbericht ist da',
  },
}

function emailTemplate(content: string, preheader?: string): string {
  const preheaderDiv = preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;color:#f8f9fa;font-size:1px;line-height:1px">${preheader}&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;</div>`
    : ''
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:Inter,Arial,sans-serif;background:#f8f9fa;margin:0;padding:0">
${preheaderDiv}
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

function buildWelcomeHtml(data: WelcomeEmailData): string {
  const annualImpact = data.quota * 12
  const manageUrl = data.memberId
    ? `${APP_URL}/${data.locale}/manage?id=${data.memberId}&token=${generateManageToken(data.memberId)}`
    : null
  const content: Record<string, string> = {
    ca: `Hola ${data.name},<br><br>
Ja ets soci/a d'Unaria. Gràcies per unir-te!<br><br>
La teva quota mensual de <strong>${data.quota}€</strong> genera un impacte real i mesurable.
En un any, contribuiràs amb <strong>${annualImpact}€</strong> per a ONG socials com Cruz Roja.<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  <strong>Propers passos:</strong><br>
  • <a href="https://unaria.org/${data.locale}/transparency" style="color:#1B4F72">Consulta on van els teus diners →</a><br>
  • Convida amics: cada amic que fas soci dobla el teu impacte
</div>
${manageUrl ? `<p style="font-size:13px;color:#6c757d;margin-top:24px">Vols fer una pausa o gestionar la subscripció? <a href="${manageUrl}" style="color:#1B4F72">Accedeix al teu panell →</a></p>` : ''}
Si tens qualsevol dubte, escriu-nos a <a href="mailto:hola@unaria.org" style="color:#1B4F72">hola@unaria.org</a>.`,
    es: `Hola ${data.name},<br><br>
Ya eres socio/a de Unaria. ¡Gracias por unirte!<br><br>
Tu cuota mensual de <strong>${data.quota}€</strong> genera un impacto real y medible.
En un año, contribuirás con <strong>${annualImpact}€</strong> para ONG sociales como Cruz Roja.<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  <strong>Próximos pasos:</strong><br>
  • <a href="https://unaria.org/${data.locale}/transparency" style="color:#1B4F72">Consulta adónde va tu dinero →</a><br>
  • Invita amigos: cada amigo que haces socio dobla tu impacto
</div>
${manageUrl ? `<p style="font-size:13px;color:#6c757d;margin-top:24px">¿Quieres hacer una pausa o gestionar tu suscripción? <a href="${manageUrl}" style="color:#1B4F72">Accede a tu panel →</a></p>` : ''}
Si tienes cualquier duda, escríbenos a <a href="mailto:hola@unaria.org" style="color:#1B4F72">hola@unaria.org</a>.`,
    en: `Hello ${data.name},<br><br>
You're now a member of Unaria. Thank you for joining!<br><br>
Your monthly fee of <strong>€${data.quota}</strong> generates real, measurable impact.
Over a year, you'll contribute <strong>€${annualImpact}</strong> to social NGOs like Cruz Roja.<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  <strong>Next steps:</strong><br>
  • <a href="https://unaria.org/${data.locale}/transparency" style="color:#1B4F72">See where your money goes →</a><br>
  • Invite friends: every friend you refer doubles your impact
</div>
${manageUrl ? `<p style="font-size:13px;color:#6c757d;margin-top:24px">Want to pause or manage your subscription? <a href="${manageUrl}" style="color:#1B4F72">Access your panel →</a></p>` : ''}
Questions? Email us at <a href="mailto:hola@unaria.org" style="color:#1B4F72">hola@unaria.org</a>.`,
    fr: `Bonjour ${data.name},<br><br>
Vous êtes maintenant membre d'Unaria. Merci de nous rejoindre !<br><br>
Votre cotisation mensuelle de <strong>${data.quota}€</strong> génère un impact réel et mesurable.
En un an, vous contribuerez à hauteur de <strong>${annualImpact}€</strong> pour des ONG sociales comme Cruz Roja.<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  <strong>Prochaines étapes :</strong><br>
  • <a href="https://unaria.org/${data.locale}/transparency" style="color:#1B4F72">Voir où va votre argent →</a><br>
  • Invitez des amis : chaque ami que vous parrainez double votre impact
</div>
${manageUrl ? `<p style="font-size:13px;color:#6c757d;margin-top:24px">Vous souhaitez faire une pause ou gérer votre abonnement ? <a href="${manageUrl}" style="color:#1B4F72">Accédez à votre espace →</a></p>` : ''}
Des questions ? Écrivez-nous à <a href="mailto:hola@unaria.org" style="color:#1B4F72">hola@unaria.org</a>.`,
    de: `Hallo ${data.name},<br><br>
Du bist jetzt Mitglied bei Unaria. Danke, dass du dabei bist!<br><br>
Dein monatlicher Beitrag von <strong>${data.quota}€</strong> erzeugt eine echte, messbare Wirkung.
Über ein Jahr hinweg trägst du <strong>${annualImpact}€</strong> für soziale NGOs wie Cruz Roja bei.<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  <strong>Nächste Schritte:</strong><br>
  • <a href="https://unaria.org/${data.locale}/transparency" style="color:#1B4F72">Sieh, wohin dein Geld geht →</a><br>
  • Freunde einladen: Jeder Freund, den du wirbst, verdoppelt deine Wirkung
</div>
${manageUrl ? `<p style="font-size:13px;color:#6c757d;margin-top:24px">Möchtest du pausieren oder dein Abonnement verwalten? <a href="${manageUrl}" style="color:#1B4F72">Zugang zu deinem Bereich →</a></p>` : ''}
Fragen? Schreib uns an <a href="mailto:hola@unaria.org" style="color:#1B4F72">hola@unaria.org</a>.`,
  }
  const preheaders: Record<string, string> = {
    ca: `En un any, generes ${annualImpact}€ per a causes socials. Gràcies per fer-te soci/a!`,
    es: `En un año, generas ${annualImpact}€ para causas sociales. ¡Gracias por hacerte socio/a!`,
    en: `Over a year, you generate €${annualImpact} for social causes. Thank you for joining!`,
    fr: `En un an, vous générez ${annualImpact}€ pour des causes sociales. Merci de nous rejoindre !`,
    de: `In einem Jahr generierst du ${annualImpact}€ für soziale Zwecke. Danke fürs Mitmachen!`,
  }
  return emailTemplate(content[data.locale] ?? content.en, preheaders[data.locale] ?? preheaders.en)
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

function buildMonthlyReceiptHtml(data: MonthlyReceiptEmailData): string {
  const manageUrl = data.memberId
    ? `${APP_URL}/${data.locale}/manage?id=${data.memberId}&token=${generateManageToken(data.memberId)}`
    : null
  const manageLink = manageUrl
    ? `<p style="font-size:13px;color:#6c757d;margin-top:20px;text-align:center"><a href="${manageUrl}" style="color:#1B4F72">Gestiona la teva subscripció →</a></p>`
    : ''
  const content: Record<string, string> = {
    ca: `Hola ${data.name},<br><br>
Hem rebut la teva quota mensual de <strong>${data.amount}€</strong>.
Gràcies per continuar fent possible l'impacte d'Unaria!<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  Import: <strong>${data.amount}€</strong><br>
  Concepte: Quota mensual Unaria
</div>
Pots veure totes les transferències a ONG a la <a href="https://unaria.org/${data.locale}/transparency" style="color:#1B4F72">pàgina de transparència</a>.${manageLink}`,
    es: `Hola ${data.name},<br><br>
Hemos recibido tu cuota mensual de <strong>${data.amount}€</strong>.
¡Gracias por seguir haciendo posible el impacto de Unaria!<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  Importe: <strong>${data.amount}€</strong><br>
  Concepto: Cuota mensual Unaria
</div>
Puedes ver todas las transferencias a ONG en la <a href="https://unaria.org/${data.locale}/transparency" style="color:#1B4F72">página de transparencia</a>.`,
    en: `Hello ${data.name},<br><br>
We've received your monthly fee of <strong>€${data.amount}</strong>.
Thank you for continuing to make Unaria's impact possible!<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  Amount: <strong>€${data.amount}</strong><br>
  Description: Unaria monthly fee
</div>
You can view all NGO transfers on the <a href="https://unaria.org/${data.locale}/transparency" style="color:#1B4F72">transparency page</a>.`,
    fr: `Bonjour ${data.name},<br><br>
Nous avons reçu votre cotisation mensuelle de <strong>${data.amount}€</strong>.
Merci de continuer à rendre possible l'impact d'Unaria !<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  Montant : <strong>${data.amount}€</strong><br>
  Libellé : Cotisation mensuelle Unaria
</div>
Vous pouvez consulter tous les virements aux ONG sur la <a href="https://unaria.org/${data.locale}/transparency" style="color:#1B4F72">page de transparence</a>.`,
    de: `Hallo ${data.name},<br><br>
Wir haben deinen Monatsbeitrag von <strong>${data.amount}€</strong> erhalten.
Danke, dass du Unarías Wirkung weiterhin ermöglichst!<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  Betrag: <strong>${data.amount}€</strong><br>
  Verwendungszweck: Monatsbeitrag Unaria
</div>
Alle NGO-Überweisungen findest du auf der <a href="https://unaria.org/${data.locale}/transparency" style="color:#1B4F72">Transparenzseite</a>.`,
  }
  const preheaders: Record<string, string> = {
    ca: `Quota de ${data.amount}€ rebuda. Gràcies per seguir generant impacte!`,
    es: `Cuota de ${data.amount}€ recibida. ¡Gracias por seguir generando impacto!`,
    en: `€${data.amount} fee received. Thank you for continuing to generate impact!`,
    fr: `Cotisation de ${data.amount}€ reçue. Merci de continuer à générer de l'impact !`,
    de: `${data.amount}€ Beitrag erhalten. Danke, dass du weiterhin Wirkung erzeugst!`,
  }
  return emailTemplate(content[data.locale] ?? content.en, preheaders[data.locale] ?? preheaders.en)
}

function buildPaymentFailedHtml(data: PaymentFailedEmailData): string {
  const updateUrl = data.updatePaymentUrl ?? `https://unaria.org/${data.locale}/profile`
  const content: Record<string, string> = {
    ca: `Hola ${data.name},<br><br>
No hem pogut processar el teu pagament de <strong>${data.amount}€</strong>.<br><br>
Pot ser degut a fons insuficients, una targeta caducada o un canvi de dades bancàries.
<strong>La teva subscripció segueix activa</strong> i ho intentarem de nou en els propers dies.<br><br>
<div style="text-align:center;margin:28px 0">
  <a href="${updateUrl}" style="background:#E8734A;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">Actualitza el teu mètode de pagament →</a>
</div>
Si necessites ajuda, escriu-nos a <a href="mailto:hola@unaria.org" style="color:#1B4F72">hola@unaria.org</a>.`,
    es: `Hola ${data.name},<br><br>
No hemos podido procesar tu pago de <strong>${data.amount}€</strong>.<br><br>
Puede deberse a fondos insuficientes, una tarjeta caducada o un cambio de datos bancarios.
<strong>Tu suscripción sigue activa</strong> y lo intentaremos de nuevo en los próximos días.<br><br>
<div style="text-align:center;margin:28px 0">
  <a href="${updateUrl}" style="background:#E8734A;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">Actualiza tu método de pago →</a>
</div>
Si necesitas ayuda, escríbenos a <a href="mailto:hola@unaria.org" style="color:#1B4F72">hola@unaria.org</a>.`,
    en: `Hello ${data.name},<br><br>
We couldn't process your payment of <strong>€${data.amount}</strong>.<br><br>
This may be due to insufficient funds, an expired card, or updated banking details.
<strong>Your subscription is still active</strong> and we'll retry in the coming days.<br><br>
<div style="text-align:center;margin:28px 0">
  <a href="${updateUrl}" style="background:#E8734A;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">Update your payment method →</a>
</div>
Need help? Email us at <a href="mailto:hola@unaria.org" style="color:#1B4F72">hola@unaria.org</a>.`,
    fr: `Bonjour ${data.name},<br><br>
Nous n'avons pas pu traiter votre paiement de <strong>${data.amount}€</strong>.<br><br>
Cela peut être dû à des fonds insuffisants, une carte expirée ou des coordonnées bancaires modifiées.
<strong>Votre abonnement reste actif</strong> et nous réessaierons dans les prochains jours.<br><br>
<div style="text-align:center;margin:28px 0">
  <a href="${updateUrl}" style="background:#E8734A;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">Mettre à jour votre moyen de paiement →</a>
</div>
Besoin d'aide ? Écrivez-nous à <a href="mailto:hola@unaria.org" style="color:#1B4F72">hola@unaria.org</a>.`,
    de: `Hallo ${data.name},<br><br>
Wir konnten deine Zahlung von <strong>${data.amount}€</strong> nicht verarbeiten.<br><br>
Dies kann auf unzureichende Mittel, eine abgelaufene Karte oder geänderte Bankdaten zurückzuführen sein.
<strong>Dein Abonnement ist noch aktiv</strong> und wir werden es in den nächsten Tagen erneut versuchen.<br><br>
<div style="text-align:center;margin:28px 0">
  <a href="${updateUrl}" style="background:#E8734A;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">Zahlungsmethode aktualisieren →</a>
</div>
Brauchst du Hilfe? Schreib uns an <a href="mailto:hola@unaria.org" style="color:#1B4F72">hola@unaria.org</a>.`,
  }
  const preheaders: Record<string, string> = {
    ca: `No hem pogut processar el teu pagament de ${data.amount}€. Actualitza les dades en 1 clic.`,
    es: `No hemos podido procesar tu pago de ${data.amount}€. Actualiza tus datos en 1 clic.`,
    en: `We couldn't process your €${data.amount} payment. Update your details in 1 click.`,
    fr: `Nous n'avons pas pu traiter votre paiement de ${data.amount}€. Mettez à jour vos données en 1 clic.`,
    de: `Wir konnten deine Zahlung von ${data.amount}€ nicht verarbeiten. Daten in 1 Klick aktualisieren.`,
  }
  return emailTemplate(content[data.locale] ?? content.en, preheaders[data.locale] ?? preheaders.en)
}

function buildCancellationHtml(data: CancellationEmailData): string {
  const reactivateUrl = `https://unaria.org/${data.locale}/register`
  const texts: Record<string, string> = {
    ca: `Hola ${data.name},<br><br>
Hem processat la teva baixa com a soci/a d'Unaria. Gràcies per tot el temps que has format part del projecte.<br><br>
Si en algun moment vols tornar, pots reactivar la teva membresía en un sol clic:<br><br>
<div style="text-align:center;margin:28px 0">
  <a href="${reactivateUrl}" style="background:#1B4F72;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">Reactivar la meva membresía →</a>
</div>
Et desitgem el millor. Si vols compartir per què et dones de baixa, escriu-nos a <a href="mailto:hola@unaria.org" style="color:#1B4F72">hola@unaria.org</a> — t'escoltem.`,
    es: `Hola ${data.name},<br><br>
Hemos procesado tu baja como socio/a de Unaria. Gracias por todo el tiempo que has formado parte del proyecto.<br><br>
Si en algún momento quieres volver, puedes reactivar tu membresía con un solo clic:<br><br>
<div style="text-align:center;margin:28px 0">
  <a href="${reactivateUrl}" style="background:#1B4F72;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">Reactivar mi membresía →</a>
</div>
Te deseamos lo mejor. Si quieres compartir por qué te das de baja, escríbenos a <a href="mailto:hola@unaria.org" style="color:#1B4F72">hola@unaria.org</a> — te escuchamos.`,
    en: `Hello ${data.name},<br><br>
We've processed your Unaria membership cancellation. Thank you for being part of the project.<br><br>
If you ever want to come back, you can reactivate your membership in one click:<br><br>
<div style="text-align:center;margin:28px 0">
  <a href="${reactivateUrl}" style="background:#1B4F72;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">Reactivate my membership →</a>
</div>
We wish you all the best. If you'd like to share why you're leaving, email us at <a href="mailto:hola@unaria.org" style="color:#1B4F72">hola@unaria.org</a> — we're listening.`,
    fr: `Bonjour ${data.name},<br><br>
Nous avons traité votre résiliation d'adhésion Unaria. Merci d'avoir fait partie du projet.<br><br>
Si jamais vous souhaitez revenir, vous pouvez réactiver votre adhésion en un clic :<br><br>
<div style="text-align:center;margin:28px 0">
  <a href="${reactivateUrl}" style="background:#1B4F72;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">Réactiver mon adhésion →</a>
</div>
Nous vous souhaitons le meilleur. Si vous souhaitez nous dire pourquoi vous partez, écrivez-nous à <a href="mailto:hola@unaria.org" style="color:#1B4F72">hola@unaria.org</a> — nous vous écoutons.`,
    de: `Hallo ${data.name},<br><br>
Wir haben deine Kündigung der Unaria-Mitgliedschaft bearbeitet. Danke, dass du Teil des Projekts warst.<br><br>
Wenn du zurückkehren möchtest, kannst du deine Mitgliedschaft mit einem Klick reaktivieren:<br><br>
<div style="text-align:center;margin:28px 0">
  <a href="${reactivateUrl}" style="background:#1B4F72;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">Mitgliedschaft reaktivieren →</a>
</div>
Wir wünschen dir alles Gute. Wenn du teilen möchtest, warum du gehst, schreib uns an <a href="mailto:hola@unaria.org" style="color:#1B4F72">hola@unaria.org</a> — wir hören zu.`,
  }
  return emailTemplate(texts[data.locale] ?? texts.en)
}

export async function sendWelcomeEmail(data: WelcomeEmailData) {
  const subject = subjects.welcome[data.locale] ?? subjects.welcome.en
  await getResend().emails.send({ from: FROM, to: data.email, subject, html: buildWelcomeHtml(data) })
}

export async function sendReceiptEmail(data: ReceiptEmailData) {
  const subject = subjects.receipt[data.locale] ?? subjects.receipt.en
  await getResend().emails.send({ from: FROM, to: data.email, subject, html: buildReceiptHtml(data) })
}

export async function sendMonthlyReceiptEmail(data: MonthlyReceiptEmailData) {
  const subject = subjects.monthlyReceipt[data.locale] ?? subjects.monthlyReceipt.en
  await getResend().emails.send({ from: FROM, to: data.email, subject, html: buildMonthlyReceiptHtml(data) })
}

export async function sendPaymentFailedEmail(data: PaymentFailedEmailData) {
  const subject = subjects.paymentFailed[data.locale] ?? subjects.paymentFailed.en
  await getResend().emails.send({ from: FROM, to: data.email, subject, html: buildPaymentFailedHtml(data) })
}

export async function sendCancellationEmail(data: CancellationEmailData) {
  const subject = subjects.cancel[data.locale] ?? subjects.cancel.en
  await getResend().emails.send({ from: FROM, to: data.email, subject, html: buildCancellationHtml(data) })
}

export async function sendPauseEmail(data: PauseEmailData) {
  const subject = subjects.pause[data.locale] ?? subjects.pause.en
  const manageUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://unaria.org'}/${data.locale}/manage?id=${data.memberId}&token=${data.token}`
  const resumeDate = data.resumesAt.toLocaleDateString(
    data.locale === 'ca' ? 'ca-ES' : data.locale === 'es' ? 'es-ES' : data.locale === 'fr' ? 'fr-FR' : data.locale === 'de' ? 'de-DE' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )
  const content: Record<string, string> = {
    ca: `Hola ${data.name},<br><br>
La teva subscripció a Unaria ha quedat pausada per 30 dies.<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  <strong>La teva subscripció reprèn automàticament el ${resumeDate}.</strong><br>
  No cal que facis res.
</div>
Si finalment vols cancel·lar definitivament, pots fer-ho des del <a href="${manageUrl}" style="color:#1B4F72">panell de gestió</a>.<br><br>
Gràcies per continuar sent part d'Unaria.`,
    es: `Hola ${data.name},<br><br>
Tu suscripción a Unaria ha quedado pausada por 30 días.<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  <strong>Tu suscripción se reanuda automáticamente el ${resumeDate}.</strong><br>
  No tienes que hacer nada.
</div>
Si finalmente quieres cancelar definitivamente, puedes hacerlo desde el <a href="${manageUrl}" style="color:#1B4F72">panel de gestión</a>.<br><br>
Gracias por seguir siendo parte de Unaria.`,
    en: `Hello ${data.name},<br><br>
Your Unaria subscription has been paused for 30 days.<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  <strong>Your subscription resumes automatically on ${resumeDate}.</strong><br>
  No action needed on your part.
</div>
If you decide to cancel permanently, you can do so from your <a href="${manageUrl}" style="color:#1B4F72">management panel</a>.<br><br>
Thank you for staying part of Unaria.`,
    fr: `Bonjour ${data.name},<br><br>
Votre abonnement Unaria a été mis en pause pendant 30 jours.<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  <strong>Votre abonnement reprend automatiquement le ${resumeDate}.</strong><br>
  Aucune action de votre part n'est nécessaire.
</div>
Si vous souhaitez finalement annuler définitivement, vous pouvez le faire depuis votre <a href="${manageUrl}" style="color:#1B4F72">panneau de gestion</a>.<br><br>
Merci de rester membre d'Unaria.`,
    de: `Hallo ${data.name},<br><br>
Dein Unaria-Abonnement wurde für 30 Tage pausiert.<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  <strong>Dein Abonnement wird am ${resumeDate} automatisch fortgesetzt.</strong><br>
  Du musst nichts weiter tun.
</div>
Wenn du doch dauerhaft kündigen möchtest, kannst du das über dein <a href="${manageUrl}" style="color:#1B4F72">Verwaltungspanel</a> tun.<br><br>
Danke, dass du Teil von Unaria bleibst.`,
  }
  await getResend().emails.send({ from: FROM, to: data.email, subject, html: emailTemplate(content[data.locale] ?? content.en) })
}

export async function sendWinbackEmail(data: WinbackEmailData) {
  const subject = subjects.winback[data.locale] ?? subjects.winback.en
  const registerUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://unaria.org'}/${data.locale}/become-member`
  const content: Record<string, string> = {
    ca: `Hola ${data.name},<br><br>
Han passat 30 dies des que et vas donar de baixa d'Unaria. T'enyorem!<br><br>
Si la situació ha canviat i vols tornar a generar impacte, fer-te de nou soci és molt senzill:<br><br>
<div style="text-align:center;margin:28px 0">
  <a href="${registerUrl}" style="background:#1B4F72;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">Tornar a fer-me soci →</a>
</div>
Pots triar la quota que vulguis, cancel·lar quan vulguis, i sempre sabràs exactament on van els teus diners.<br><br>
Fins aviat, esperem.`,
    es: `Hola ${data.name},<br><br>
Han pasado 30 días desde que te diste de baja de Unaria. ¡Te echamos de menos!<br><br>
Si la situación ha cambiado y quieres volver a generar impacto, hacerte de nuevo socio es muy sencillo:<br><br>
<div style="text-align:center;margin:28px 0">
  <a href="${registerUrl}" style="background:#1B4F72;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">Volver a hacerme socio →</a>
</div>
Puedes elegir la cuota que quieras, cancelar cuando quieras, y siempre sabrás exactamente adónde van tu dinero.<br><br>
Hasta pronto, esperamos.`,
    en: `Hello ${data.name},<br><br>
It's been 30 days since you left Unaria. We miss you!<br><br>
If things have changed and you'd like to generate impact again, rejoining is simple:<br><br>
<div style="text-align:center;margin:28px 0">
  <a href="${registerUrl}" style="background:#1B4F72;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">Become a member again →</a>
</div>
Choose any fee you like, cancel whenever you want, and you'll always know exactly where your money goes.<br><br>
We hope to see you soon.`,
    fr: `Bonjour ${data.name},<br><br>
Cela fait 30 jours que vous avez quitté Unaria. Vous nous manquez !<br><br>
Si la situation a changé et que vous souhaitez à nouveau générer un impact, vous réinscrire est très simple :<br><br>
<div style="text-align:center;margin:28px 0">
  <a href="${registerUrl}" style="background:#1B4F72;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">Redevenir membre →</a>
</div>
Choisissez la cotisation que vous souhaitez, annulez quand vous voulez, et vous saurez toujours exactement où va votre argent.<br><br>
À bientôt, nous l'espérons.`,
    de: `Hallo ${data.name},<br><br>
Es sind 30 Tage vergangen, seit du Unaria verlassen hast. Wir vermissen dich!<br><br>
Wenn sich die Lage geändert hat und du wieder Wirkung erzielen möchtest, ist eine erneute Anmeldung ganz einfach:<br><br>
<div style="text-align:center;margin:28px 0">
  <a href="${registerUrl}" style="background:#1B4F72;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">Wieder Mitglied werden →</a>
</div>
Wähle den Beitrag, den du möchtest, kündige wann immer du willst, und du weißt immer genau, wohin dein Geld fließt.<br><br>
Wir hoffen, dich bald wiederzusehen.`,
  }
  const preheaders: Record<string, string> = {
    ca: `Han passat 30 dies. Torna a generar impacte quan vulguis.`,
    es: `Han pasado 30 días. Vuelve a generar impacto cuando quieras.`,
    en: `It's been 30 days. Start generating impact again whenever you're ready.`,
    fr: `30 jours ont passé. Recommencez à générer de l'impact quand vous voulez.`,
    de: `30 Tage sind vergangen. Erziele wieder Wirkung, wann immer du möchtest.`,
  }
  await getResend().emails.send({
    from: FROM, to: data.email, subject,
    html: emailTemplate(content[data.locale] ?? content.en, preheaders[data.locale] ?? preheaders.en),
  })
}

export async function sendReferralJoinedEmail(data: ReferralJoinedEmailData) {
  const subject = subjects.referralJoined[data.locale] ?? subjects.referralJoined.en
  const content: Record<string, string> = {
    ca: `Hola ${data.referrerName},<br><br>
Bona notícia: <strong>${data.newMemberName}</strong> acaba de fer-se soci/a d'Unaria gràcies al teu link de referit!<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  Cada amic que fas soci dobla el teu impacte a la comunitat Unaria.
</div>
Gràcies per fer créixer el projecte. El teu perfil de soci ja reflecteix la nova referència.<br><br>
Continua compartint el teu link i ajuda més persones a unir-se!`,
    es: `Hola ${data.referrerName},<br><br>
Buena noticia: <strong>${data.newMemberName}</strong> acaba de hacerse socio/a de Unaria ¡gracias a tu link de referido!<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  Cada amigo que haces socio dobla tu impacto en la comunidad Unaria.
</div>
Gracias por hacer crecer el proyecto. Tu perfil de socio ya refleja la nueva referencia.<br><br>
¡Sigue compartiendo tu link y ayuda a más personas a unirse!`,
    en: `Hello ${data.referrerName},<br><br>
Great news: <strong>${data.newMemberName}</strong> just became a member of Unaria thanks to your referral link!<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  Every friend you refer doubles your impact in the Unaria community.
</div>
Thank you for growing the project. Your member profile now reflects the new referral.<br><br>
Keep sharing your link and help more people join!`,
    fr: `Bonjour ${data.referrerName},<br><br>
Bonne nouvelle : <strong>${data.newMemberName}</strong> vient de devenir membre d'Unaria grâce à votre lien de parrainage !<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  Chaque ami que vous parrainez double votre impact dans la communauté Unaria.
</div>
Merci de faire grandir le projet. Votre profil de membre reflète désormais le nouveau parrainage.<br><br>
Continuez à partager votre lien et aidez plus de personnes à nous rejoindre !`,
    de: `Hallo ${data.referrerName},<br><br>
Gute Neuigkeiten: <strong>${data.newMemberName}</strong> ist gerade dank deines Empfehlungslinks Mitglied bei Unaria geworden!<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  Jeder Freund, den du wirbst, verdoppelt deine Wirkung in der Unaria-Community.
</div>
Danke, dass du das Projekt wachsen lässt. Dein Mitgliederprofil spiegelt nun die neue Empfehlung wider.<br><br>
Teile deinen Link weiter und hilf mehr Menschen, beizutreten!`,
  }
  const preheaders: Record<string, string> = {
    ca: `${data.newMemberName} acaba de fer-se soci gràcies a tu. Gràcies!`,
    es: `${data.newMemberName} acaba de hacerse socio gracias a ti. ¡Gracias!`,
    en: `${data.newMemberName} just joined thanks to you. Thank you!`,
    fr: `${data.newMemberName} vient de rejoindre grâce à vous. Merci !`,
    de: `${data.newMemberName} ist gerade dank dir beigetreten. Danke!`,
  }
  await getResend().emails.send({
    from: FROM, to: data.referrerEmail, subject,
    html: emailTemplate(content[data.locale] ?? content.en, preheaders[data.locale] ?? preheaders.en),
  })
}

export async function sendAnnualTransparencyEmail(data: AnnualTransparencyEmailData) {
  const subject = `${subjects.annualTransparency[data.locale] ?? subjects.annualTransparency.en} ${data.year}`
  const ngoList = data.ngoNames.join(', ')
  const content: Record<string, string> = {
    ca: `Hola ${data.name},<br><br>
Aquí tens la memòria de transparència d'Unaria de l'any <strong>${data.year}</strong>.<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  <strong>Total transferit a ONG l'any ${data.year}:</strong> ${data.totalTransferred.toLocaleString('ca-ES')}€<br>
  <strong>ONG beneficiàries:</strong> ${ngoList}<br>
  <strong>Socis actius:</strong> ${data.totalMembers}<br>
  <strong>La teva contribució estimada:</strong> ${data.personalContribution}€
</div>
<a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://unaria.org'}/${data.locale}/transparency" style="color:#1B4F72">Consulta el detall complet a la pàgina de transparència →</a><br><br>
Gràcies per ser part d'Unaria durant el ${data.year}. El teu suport fa possible tot això.`,
    es: `Hola ${data.name},<br><br>
Aquí tienes la memoria de transparencia de Unaria del año <strong>${data.year}</strong>.<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  <strong>Total transferido a ONG en ${data.year}:</strong> ${data.totalTransferred.toLocaleString('es-ES')}€<br>
  <strong>ONG beneficiarias:</strong> ${ngoList}<br>
  <strong>Socios activos:</strong> ${data.totalMembers}<br>
  <strong>Tu contribución estimada:</strong> ${data.personalContribution}€
</div>
<a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://unaria.org'}/${data.locale}/transparency" style="color:#1B4F72">Consulta el detalle completo en la página de transparencia →</a><br><br>
Gracias por ser parte de Unaria durante ${data.year}. Tu apoyo hace posible todo esto.`,
    en: `Hello ${data.name},<br><br>
Here is Unaria's transparency report for <strong>${data.year}</strong>.<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  <strong>Total transferred to NGOs in ${data.year}:</strong> €${data.totalTransferred.toLocaleString('en-GB')}<br>
  <strong>NGO beneficiaries:</strong> ${ngoList}<br>
  <strong>Active members:</strong> ${data.totalMembers}<br>
  <strong>Your estimated contribution:</strong> €${data.personalContribution}
</div>
<a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://unaria.org'}/${data.locale}/transparency" style="color:#1B4F72">View the full details on the transparency page →</a><br><br>
Thank you for being part of Unaria in ${data.year}. Your support makes all of this possible.`,
    fr: `Bonjour ${data.name},<br><br>
Voici le rapport de transparence d'Unaria pour l'année <strong>${data.year}</strong>.<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  <strong>Total transféré aux ONG en ${data.year} :</strong> ${data.totalTransferred.toLocaleString('fr-FR')}€<br>
  <strong>ONG bénéficiaires :</strong> ${ngoList}<br>
  <strong>Membres actifs :</strong> ${data.totalMembers}<br>
  <strong>Votre contribution estimée :</strong> ${data.personalContribution}€
</div>
<a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://unaria.org'}/${data.locale}/transparency" style="color:#1B4F72">Consultez le détail complet sur la page de transparence →</a><br><br>
Merci de faire partie d'Unaria en ${data.year}. Votre soutien rend tout cela possible.`,
    de: `Hallo ${data.name},<br><br>
Hier ist Unarías Transparenzbericht für das Jahr <strong>${data.year}</strong>.<br><br>
<div style="background:#f0f7ff;border-left:4px solid #1B4F72;padding:16px 20px;margin:20px 0;border-radius:0 4px 4px 0">
  <strong>Gesamt an NGOs überwiesen ${data.year}:</strong> ${data.totalTransferred.toLocaleString('de-DE')}€<br>
  <strong>NGO-Begünstigte:</strong> ${ngoList}<br>
  <strong>Aktive Mitglieder:</strong> ${data.totalMembers}<br>
  <strong>Dein geschätzter Beitrag:</strong> ${data.personalContribution}€
</div>
<a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://unaria.org'}/${data.locale}/transparency" style="color:#1B4F72">Vollständige Details auf der Transparenzseite →</a><br><br>
Danke, dass du ${data.year} Teil von Unaria warst. Deine Unterstützung macht das alles möglich.`,
  }
  const preheaders: Record<string, string> = {
    ca: `${data.totalTransferred.toLocaleString('ca-ES')}€ transferits a ONG el ${data.year}. Gràcies per la teva contribució!`,
    es: `${data.totalTransferred.toLocaleString('es-ES')}€ transferidos a ONG en ${data.year}. ¡Gracias por tu contribución!`,
    en: `€${data.totalTransferred.toLocaleString('en-GB')} transferred to NGOs in ${data.year}. Thank you!`,
    fr: `${data.totalTransferred.toLocaleString('fr-FR')}€ transférés aux ONG en ${data.year}. Merci !`,
    de: `${data.totalTransferred.toLocaleString('de-DE')}€ an NGOs überwiesen ${data.year}. Danke!`,
  }
  await getResend().emails.send({
    from: FROM, to: data.email, subject,
    html: emailTemplate(content[data.locale] ?? content.en, preheaders[data.locale] ?? preheaders.en),
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
