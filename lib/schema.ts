import { pgTable, text, decimal, timestamp } from "drizzle-orm/pg-core";

// 1. User Table
export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
  createdAt: timestamp("createdAt").defaultNow(),
});

// 2. Product Table
export const products = pgTable("product", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  image: text("image"),
});