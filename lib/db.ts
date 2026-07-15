import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Build වෙද්දී Database එකට connect වෙන්න හදන්න එපා
let db: any;

if (process.env.NODE_ENV === 'production') {
    // Production වලදී විතරක් DB එක හදන්න
    const client = postgres(process.env.DATABASE_URL!, { ssl: 'require' });
    db = drizzle(client);
} else {
    // Local development වලදී විතරක් DB එක හදන්න
    const client = postgres(process.env.DATABASE_URL!);
    db = drizzle(client);
}

export { db };