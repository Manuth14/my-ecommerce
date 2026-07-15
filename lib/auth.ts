// lib/auth.ts
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { users } from "./schema";

const authOptions = {
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" as const },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const [user] = await db.select().from(users).where(eq(users.email, credentials.email as string));
        if (!user || !user.password) return null;
        const isMatch = await bcrypt.compare(credentials.password as string, user.password);
        return isMatch ? { id: user.id, email: user.email, name: user.name } : null;
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }: any) {
      if (session.user && token.id) session.user.id = token.id as string;
      return session;
    },
  },
};

// මේ විදියට වෙනස් කරන්න:
const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

export { handlers, signIn, signOut, auth };