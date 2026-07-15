"use server";

import { db } from "../../lib/db";
import { users } from "../../lib/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  // 1. Password එක Hash කිරීම
  const hashedPassword = await bcrypt.hash(password, 10);

  // 2. Database එකට insert කිරීම
  try {
    await db.insert(users).values({
      email,
      password: hashedPassword,
      name,
    });
    return { success: true };
  } catch (error) {
    console.error("Sign up error:", error);
    return { success: false, message: "මෙම Email එක දැනටමත් පවතී!" };
  }
}

import { signIn as authSignIn } from "@/lib/auth";
import { AuthError } from "next-auth";

async function signIn(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await authSignIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email හෝ Password වැරදියි!" };
        default:
          return { error: "යම් දෝෂයක් සිදුවුණා, නැවත උත්සාහ කරන්න." };
      }
    }
    // Auth.js විසින්ම කරන redirect එක catch වෙන්න පුළුවන්, ඒ නිසා මේක අත්‍යවශ්‍යයි
    throw error; 
  }
}

import { signOut as authSignOut } from "@/lib/auth";

async function logoutAction() {
  await authSignOut({ redirectTo: "/login" });
}

export { signUp, signIn, logoutAction };