# Unaria Admin Panel 🚀

Aquesta és l'aplicació d'administració per a la Fundació Unaria. Està separada de la web pública per motius de seguretat i rendiment, però utilitza la mateixa base de dades centralitzada.

## Stack Tècnic
- **Framework:** Next.js 14 (App Router)
- **Base de dades:** Prisma (PostgreSQL)
- **Autenticació:** NextAuth.js
- **Estils:** Tailwind CSS
- **Icones:** Lucide React

## Configuració Local
1. Clona el repositori.
2. Instal·la les dependències: `npm install`
3. Copia el fitxer `.env.example` a `.env` i omple les dades de connexió.
4. Genera el client de Prisma: `npm run db:generate`
5. Executa el servidor de desenvolupament: `npm run dev` (per defecte al port 3001)

## Base de Dades Compartida
Aquesta aplicació té els permisos per realitzar migracions (`npx prisma migrate dev`). La web pública només hauria de fer `prisma generate` per evitar conflictes.

## Seguretat
L'accés està restringit a usuaris registrats a la taula `AdminUser`. Pots crear el primer administrador executant:
`npm run db:seed`
