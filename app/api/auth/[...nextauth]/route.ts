// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth";

// මෙන්න මේ වෙනස්කම කරන්න:
export const GET = handlers.GET;
export const POST = handlers.POST;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";