import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { users } from "./schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        const [user] = await db.select().from(users).where(eq(users.email, email));

        if (!user || !user.password) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  pages: { 
    signIn: "/login" 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      // මෙතන තමයි කලින් error එක ආවේ. 
      // session.user.id එක අනිවාර්යයෙන්ම string එකක් බව සහතික කරනවා.
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});