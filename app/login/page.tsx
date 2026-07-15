'use client'
import { useActionState } from "react";
import { signIn } from "@/app/actions/auth"; // ඉහත හැදූ file එක

export default function LoginPage() {
  const [state, action, isPending] = useActionState(signIn, undefined);

  return (
    <form action={action} className="flex flex-col gap-4 border p-8 w-96 mx-auto mt-10">
      <h1 className="text-xl font-bold">Login</h1>
      
      <input name="email" type="email" placeholder="Email" className="border p-2" required />
      <input name="password" type="password" placeholder="Password" className="border p-2" required />
      
      <button 
        type="submit" 
        disabled={isPending}
        className="bg-green-600 text-white p-2 rounded"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
      
      {state?.error && (
        <p className="text-red-500 text-sm text-center font-semibold mt-2">
          {state.error}
        </p>
      )}
    </form>
  );
}