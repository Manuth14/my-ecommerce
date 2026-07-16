import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './lib/schema.ts', // ඔයාගේ schema ෆයිල් එක තියෙන තැන (හරි පාර දෙන්න)
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});