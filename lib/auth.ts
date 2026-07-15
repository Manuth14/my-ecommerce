import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { users } from "./schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" }, // Credentials provider එකත් එක්ක අනිවාර්යයෙන්ම JWT පාවිච්චි කරන්න
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validation: email සහ password තියෙනවද බලන්න
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        // DB එකෙන් User ව හොයමු
        const [user] = await db.select().from(users).where(eq(users.email, email));

        // User නැත්නම් හෝ password එක null නම් null return කරන්න
        if (!user || !user.password) return null;

        // Password match වෙනවද බලන්න
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) return null;

        // User object එක return කරන්න
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  pages: { 
    signIn: "/login" 
  },
  callbacks: {
    // Session එකේ ID එක සහ details හරියට පේන්න මේක ඕනේ
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
});