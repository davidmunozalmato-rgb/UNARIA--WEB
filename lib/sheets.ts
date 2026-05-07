import { google } from 'googleapis'

async function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  if (!email || !key) throw new Error('Missing Google service account credentials')
  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  await auth.authorize()
  return auth
}

export type PaymentRow = {
  date: string          // ISO date
  type: 'Soci' | 'Donació puntual' | 'Quota mensual'
  name: string
  email: string
  amount: number
  currency: string
  status: string
  reference: string     // Stripe session or payment intent ID
}

export async function appendPaymentRow(row: PaymentRow): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID
  if (!spreadsheetId) {
    console.warn('GOOGLE_SHEETS_ID not set — skipping Sheets append')
    return
  }

  try {
    const auth = await getAuth()
    const sheets = google.sheets({ version: 'v4', auth })

    // Ensure header row exists on first use
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Pagaments!A1:H1',
    })

    if (!existing.data.values || existing.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Pagaments!A1:H1',
        valueInputOption: 'RAW',
        requestBody: {
          values: [['Data', 'Tipus', 'Nom', 'Email', 'Import (€)', 'Moneda', 'Estat', 'Referència Stripe']],
        },
      })
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Pagaments!A:H',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[
          row.date,
          row.type,
          row.name,
          row.email,
          row.amount,
          row.currency,
          row.status,
          row.reference,
        ]],
      },
    })
  } catch (err) {
    // Never crash the webhook if Sheets fails
    console.error('Google Sheets append failed:', err)
  }
}
