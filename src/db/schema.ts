import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import { z } from 'zod';

// https://orm.drizzle.team/docs/column-types/pg
export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

// https://orm.drizzle.team/docs/zod
export const userSelectSchema = createSelectSchema(usersTable);
export const userInsertSchema = createInsertSchema(usersTable);
export const userUpdateSchema = createUpdateSchema(usersTable);

// typeof usersTable.$inferInsert
export type UserSelectType = z.infer<typeof userSelectSchema>;
export type UserInsertType = z.infer<typeof userInsertSchema>;
export type UserUpdateType = z.infer<typeof userUpdateSchema>;
