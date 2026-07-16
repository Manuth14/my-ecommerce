import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Build වෙලාවේදී error එකක් නොවෙන්න DATABASE_URL එක check කරන්න
const connectionString = process.env.DATABASE_URL!;

// Production වලදී SSL අනිවාර්යයි, Local වලදී අවශ්‍ය නැහැ.
// Neon වලදී SSL දාන එක ඕනෑම වෙලාවක ආරක්ෂිතයි.
const client = postgres(connectionString, { 
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false 
});

export const db = drizzle(client);