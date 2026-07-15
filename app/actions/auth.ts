"use server";

import { db } from "../../lib/db";
import { users } from "../../lib/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { signIn as authSignIn, signOut as authSignOut } from "@/lib/auth";
// NextAuth v5 වලදී AuthError සාමාන්‍යයෙන් පහත ලෙසයි import වෙන්නේ
// @ts-ignore
import { AuthError } from "next-auth";

// 1. SignUp Action
async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const hashedPassword = await bcrypt.hash(password, 10);

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

// 2. SignIn Action
async function signIn(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await authSignIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error: unknown) {
    // Auth.js redirect එකක් දෙනවා නම් ඒක error එකක් විදියට පේන්න පුළුවන්,
    // ඒ නිසා RedirectError ද බැලිය යුතුයි.
    if (
      typeof error === "object" &&
      error !== null &&
      "type" in error
    ) {
      const authError = error as AuthError;
      switch (authError.type) {
        case "CredentialsSignin":
          return { error: "Email හෝ Password වැරදියි!" };
        default:
          return { error: "යම් දෝෂයක් සිදුවුණා, නැවත උත්සාහ කරන්න." };
      }
    }

    // Redirect එකක් නම් throw කරන්න ඕනේ, නැත්නම් error එකක් විදියට පේනවා
    throw error;
  }
}

// 3. Logout Action
async function logoutAction() {
  await authSignOut({ redirectTo: "/login" });
}

export { signUp, signIn, logoutAction };