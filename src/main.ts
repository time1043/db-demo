import { eq } from 'drizzle-orm';

import {
  userInsertSchema,
  UserInsertType,
  userSelectSchema,
  usersTable,
  userUpdateSchema,
  UserUpdateType,
} from './db/schema';
import { db } from './libs/drizzle';

async function main() {
  const user: UserInsertType = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
  };
  const parsedUser = userInsertSchema.parse(user);
  await db.insert(usersTable).values(parsedUser);
  console.log('New user created!');

  const users = await db.select().from(usersTable);
  const parsedUsers = userSelectSchema.parse(users);
  console.log('Getting all users from the database: ', parsedUsers);

  const updatedUser: UserUpdateType = {
    age: 31,
  };
  const parsedUpdatedUser = userUpdateSchema.parse(updatedUser);
  await db.update(usersTable).set(parsedUpdatedUser).where(eq(usersTable.email, user.email));
  console.log('User info updated!');

  // await db.delete(usersTable).where(eq(usersTable.email, user.email));
  // console.log('User deleted!');
}

main();
