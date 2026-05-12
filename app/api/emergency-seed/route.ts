import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    const email = process.env.ADMIN_EMAIL || 'admin@unaria.org'
    const password = process.env.ADMIN_PASSWORD || 'admin1234'
    const hash = await bcrypt.hash(password, 12)

    await prisma.adminUser.upsert({
      where: { email },
      update: {
        passwordHash: hash
      },
      create: {
        email,
        passwordHash: hash,
        name: 'Administrador Unaria',
        preferredLocale: 'ca',
      },
    })

    return NextResponse.json({ success: true, message: `Admin ${email} created/updated with password from env.` })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
