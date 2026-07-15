export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import LogoutButton from "../components/LogoutButton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // Database එකෙන් සියලුම products ලබා ගැනීම
  const productList = await db.select().from(products);
  const session = await auth();

  // session එකේ user කෙනෙක් නැත්නම් redirect කරන්න
  if (!session?.user) {
    redirect("/login");
  }

  
  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">FoodGo Menu</h1>
      <p>Hello, {session.user.name}</p>
        <LogoutButton />
      </div>

      {/* Products පෙන්නන Grid එක */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productList.map((product) => (
          <div key={product.id} className="border p-5 rounded-xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-green-700">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-xl font-bold mt-4">Rs. {Number(product.price).toFixed(2)}</p>
            
            <button className="w-full bg-green-600 text-white mt-4 py-2 rounded-lg hover:bg-green-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}