# Database Migration Plan: MySQL to Supabase (PostgreSQL)

This document outlines the plan to migrate the AutoPilot database from MySQL to Supabase (PostgreSQL) using Drizzle ORM. The existing schema is defined in `drizzle/schema.ts`.

## 1. Analyze Current MySQL Schema (`drizzle/schema.ts`)

Review the existing MySQL schema for data types and features that might require adjustments for PostgreSQL compatibility. Key considerations:

-   **`mysqlEnum`**: PostgreSQL has `ENUM` types, but Drizzle's `mysqlEnum` needs to be replaced with `pgEnum` or equivalent. This will require defining the enum types explicitly in PostgreSQL.
-   **`int().autoincrement().primaryKey()`**: PostgreSQL uses `serial` or `bigserial` for auto-incrementing primary keys. Drizzle's `serial()` or `bigserial()` functions will be used.
-   **`timestamp().defaultNow().onUpdateNow()`**: PostgreSQL has similar timestamp functionalities, but `onUpdateNow()` might need a trigger or a specific Drizzle configuration for PostgreSQL.
-   **`json()`**: PostgreSQL has a native `jsonb` type which is generally preferred over `json` for performance and indexing. Drizzle's `jsonb()` will be used.
-   **`decimal({ precision, scale })`**: Directly compatible.
-   **`varchar({ length })`**: Directly compatible.
-   **`text()`**: Directly compatible.
-   **`boolean()`**: Directly compatible.
-   **`date()`**: Directly compatible.
-   **`unique()`**: Directly compatible.

## 2. Supabase Setup

1.  **Create a new Supabase project**: Go to [Supabase](https://supabase.com/) and create a new project.
2.  **Obtain Connection String**: Get the PostgreSQL connection string from the Supabase project settings. This will be used for `DATABASE_URL` in the `.env` file.

## 3. Modify Drizzle Schema for PostgreSQL

Update `drizzle/schema.ts` to use PostgreSQL-compatible Drizzle functions and types:

-   Replace `drizzle-orm/mysql-core` imports with `drizzle-orm/pg-core`.
-   Replace `mysqlTable` with `pgTable`.
-   Replace `mysqlEnum` with `pgEnum` and define the enum types.
-   Replace `int().autoincrement().primaryKey()` with `serial('id').primaryKey()` or `bigserial('id').primaryKey()`.
-   Adjust `timestamp` definitions if `onUpdateNow()` requires specific PostgreSQL handling (e.g., using `default(sql`now()`)` and triggers for `updatedAt`).
-   Replace `json()` with `jsonb()`.

**Example for `users` table:**

```typescript
import { pgTable, serial, text, varchar, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Define enums for PostgreSQL
export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
export const subscriptionTierEnum = pgEnum("subscription_tier", ["free", "basic", "pro"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRoleEnum("role").default("user").notNull(),
  subscriptionTier: subscriptionTierEnum("subscriptionTier").default("free").notNull(),
  trialStartedAt: timestamp("trialStartedAt").default(sql`now()`).notNull(),
  trialDaysRemaining: int("trialDaysRemaining").default(30).notNull(),
  isEarlyAdopter: boolean("isEarlyAdopter").default(false).notNull(),
  trialConvertedAt: timestamp("trialConvertedAt"),
  createdAt: timestamp("createdAt").default(sql`now()`).notNull(),
  updatedAt: timestamp("updatedAt").default(sql`now()`).notNull(), // Consider trigger for onUpdateNow
  lastSignedIn: timestamp("lastSignedIn").default(sql`now()`).notNull(),
});
```

## 4. Update Drizzle Configuration

Modify `drizzle.config.ts` to point to the PostgreSQL driver and schema location.

```typescript
import type { Config } from "drizzle-kit";

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  driver: "pg", // Change to 'pg' for PostgreSQL
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;
```

## 5. Run Migrations

1.  **Generate new migration files**: After updating the schema, generate new migration files for PostgreSQL.
    ```bash
    npx drizzle-kit generate:pg
    ```
2.  **Apply migrations to Supabase**: Run the migrations against the Supabase database.
    ```bash
    npx drizzle-kit migrate
    ```

## 6. Update Database Connection in `db.ts`

Modify `server/db.ts` to use the PostgreSQL client (e.g., `node-postgres`) instead of `mysql2`.

```typescript
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "../drizzle/schema";

let db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (db) return db;

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  db = drizzle(client, { schema });
  return db;
}
```

## 7. Seed Initial Data (if necessary)

If there's any initial data required (e.g., `earlyAdopterCounter`, `subscriptionTiers`), create a seeding script to populate the Supabase database.

## 8. Verification

After migration, verify that all tables and data are correctly present in the Supabase database. Test core functionalities that interact with the database.
