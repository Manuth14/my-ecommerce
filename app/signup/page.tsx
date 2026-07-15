'use client'
import { signUp } from  "../actions/auth";
import { useState } from "react";

function SignUpPage() {
  const [message, setMessage] = useState("");

  async function handleAction(formData: FormData) {
    const res = await signUp(formData);
    if (res.success) {
      setMessage("සාර්ථකව ලියාපදිංචි වුණා!");
    } else {
      setMessage(res.message || "වැරදීමක් සිදු විය.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form action={handleAction} className="flex flex-col gap-4 border p-8 rounded-lg shadow-md w-96">
        <h1 className="text-xl font-bold">Sign Up</h1>
        <input name="name" placeholder="Name" className="border p-2 rounded" required />
        <input name="email" type="email" placeholder="Email" className="border p-2 rounded" required />
        <input name="password" type="password" placeholder="Password" className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
        {message && <p className="text-center text-sm">{message}</p>}
      </form>
    </div>
  );
}

export default SignUpPage;