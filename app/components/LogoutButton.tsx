"use client";
import { logoutAction } from "@/app/actions/auth";

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button 
        type="submit" 
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
      >
        Logout
      </button>
    </form>
  );
}