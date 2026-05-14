import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@unaria.org'
  const password = process.env.ADMIN_PASSWORD || 'su0626oj'
  const hash = await bcrypt.hash(password, 12)

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash: hash },
    create: {
      email,
      passwordHash: hash,
      name: 'Administrador Unaria',
      preferredLocale: 'ca',
    },
  })

  console.log(`✅ Admin user seeded: ${email}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
