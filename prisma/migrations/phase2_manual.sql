-- Phase 2 manual migration
-- Run with: psql $DATABASE_URL -f prisma/migrations/phase2_manual.sql
-- Or via: npx prisma migrate dev --name phase2

ALTER TYPE "MemberStatus" ADD VALUE IF NOT EXISTS 'paused';

ALTER TABLE "Member"
  ADD COLUMN IF NOT EXISTS "referralCode"       TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS "referredBy"         TEXT,
  ADD COLUMN IF NOT EXISTS "pausedUntil"        TIMESTAMP,
  ADD COLUMN IF NOT EXISTS "cancelledAt"        TIMESTAMP,
  ADD COLUMN IF NOT EXISTS "winbackEmailSentAt" TIMESTAMP;

CREATE INDEX IF NOT EXISTS "Member_referralCode_idx" ON "Member"("referralCode");
