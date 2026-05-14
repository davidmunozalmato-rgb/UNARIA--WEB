INSERT INTO "AdminUser" (id, email, "passwordHash", name, "updatedAt") 
VALUES ('cli-admin', 'admin@unaria.org', '$2a$12$iIXJTCEnxum/.4HPgvxtleThAxSmydn82Z.Aulytn4XORwcDX/rJG', 'Admin', NOW()) 
ON CONFLICT (email) DO UPDATE SET "passwordHash" = EXCLUDED."passwordHash";
