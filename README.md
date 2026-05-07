# Unaria – Website

Production-ready website for Unaria (unaria.org), a non-profit association based in Barcelona that raises funds through monthly subscriptions and one-time donations, channelling all surplus to established NGOs such as Cruz Roja.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** – styling
- **Prisma ORM** + **PostgreSQL** – database
- **Stripe** – card payments and SEPA subscriptions
- **Resend** – transactional email
- **next-intl** – i18n: Catalan, Spanish, English, French, German
- **NextAuth.js** – admin authentication
- **AES-256-GCM** – IBAN encryption at rest

---

## Quick start (local dev)

### 1. Prerequisites

- Node.js 20+
- Docker + Docker Compose (for local PostgreSQL)
- A Stripe account (test keys)
- A Resend account (or use `EMAIL_FROM` pointed at any SMTP)

### 2. Clone and install

```bash
git clone https://github.com/your-org/unaria-web.git
cd unaria-web
npm install
```

### 3. Environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Random 32+ char string (use `openssl rand -base64 32`) |
| `STRIPE_SECRET_KEY` | Stripe secret key (sk_test_…) |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (pk_test_…) |
| `STRIPE_WEBHOOK_SECRET` | From `stripe listen` or Stripe Dashboard |
| `RESEND_API_KEY` | Resend API key (re_…) |
| `ENCRYPTION_KEY` | 64-character hex string (32 bytes) – use `openssl rand -hex 32` |
| `ADMIN_EMAIL` | Initial admin email |
| `ADMIN_PASSWORD` | Initial admin password |

### 4. Database

```bash
# Start local PostgreSQL
docker-compose up db -d

# Run migrations
npm run db:migrate

# Seed admin user
npm run db:seed
```

### 5. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/ca` by default.

Admin panel: [http://localhost:3000/ca/admin](http://localhost:3000/ca/admin)

### 6. Stripe webhook (local)

Install Stripe CLI and run:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook secret to `STRIPE_WEBHOOK_SECRET` in `.env`.

---

## Deployment

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add all environment variables from `.env.example`
4. Set `NEXT_PUBLIC_APP_URL` to your production URL
5. Add Stripe webhook in Stripe Dashboard pointing to `https://yourdomain.com/api/stripe/webhook`
6. Run migrations: `npx prisma migrate deploy`

### Docker / self-hosted VPS

```bash
# Build and start all services
docker-compose up --build -d

# Run migrations inside container
docker-compose exec app npx prisma migrate deploy
docker-compose exec app npm run db:seed
```

The app runs on port 3000. Use Nginx/Caddy as reverse proxy with TLS.

**Nginx example:**
```nginx
server {
    listen 443 ssl;
    server_name unaria.org;
    ssl_certificate /etc/letsencrypt/live/unaria.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/unaria.org/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Project structure

```
unaria-web/
├── app/
│   ├── [locale]/          # All locale-aware pages
│   │   ├── page.tsx       # Home
│   │   ├── about/
│   │   ├── how-we-work/
│   │   ├── become-member/ # Member signup with SEPA/card
│   │   ├── donate/        # One-time donation
│   │   ├── transparency/
│   │   ├── privacy-policy/
│   │   ├── legal-notice/
│   │   └── admin/         # Password-protected admin
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   ├── members/       # POST new member
│   │   ├── donations/     # POST one-time donation
│   │   ├── stripe/webhook/
│   │   └── admin/         # Admin API endpoints
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx           # Redirects to /ca
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── LanguageSwitcher.tsx
│   ├── CookieBanner.tsx
│   ├── AnimatedCounter.tsx
│   └── SessionProvider.tsx
├── lib/
│   ├── auth.ts            # NextAuth config
│   ├── email.ts           # Resend email helpers
│   ├── encryption.ts      # AES-256-GCM for IBAN
│   ├── prisma.ts
│   ├── rateLimit.ts
│   ├── stripe.ts
│   └── utils.ts
├── messages/              # i18n translations
│   ├── ca.json            # Catalan (default)
│   ├── es.json
│   ├── en.json
│   ├── fr.json
│   └── de.json
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── i18n.ts
├── middleware.ts
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Languages

The site supports 5 locales with URL prefix routing:

| Locale | URL prefix | Default |
|---|---|---|
| Catalan | `/ca/` | ✅ |
| Spanish | `/es/` | |
| English | `/en/` | |
| French | `/fr/` | |
| German | `/de/` | |

Language preference is stored in a `NEXT_LOCALE` cookie and persists across navigation.

---

## Security

- IBAN encrypted with AES-256-GCM at rest
- HTTPS-only headers (`Strict-Transport-Security`, `X-Frame-Options`, etc.)
- Rate limiting on all public API routes (10 req/min per IP by default)
- Input validation with Zod on all API endpoints
- GDPR: unbundled, unchecked consent checkboxes; consent timestamp, IP and locale stored in DB
- NextAuth.js session with JWT (8h expiry) for admin

---

## GDPR & Legal

- Cookie banner (technical cookies mandatory, analytics opt-in)
- Privacy Policy and Legal Notice fully translated in all 5 languages
- Data controller: Unaria (not the NGOs)
- Members can request deletion by emailing privacitat@unaria.org
