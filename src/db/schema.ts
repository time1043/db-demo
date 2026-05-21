import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

// https://orm.drizzle.team/docs/column-types/pg
export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
