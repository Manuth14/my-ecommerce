import { handlers } from "@/lib/auth";

// මෙතැනදී කෙලින්ම export නොකර, conditional export එකක් වගේ හිතන්න
export const GET = handlers?.GET;
export const POST = handlers?.POST;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";