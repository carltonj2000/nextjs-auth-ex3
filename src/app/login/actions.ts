"use server";
import { cookies } from "next/headers";

import { db } from "@/db";
import { users as userTable } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export async function login(username: string) {
  cookies().set("login", username);
  try {
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username))
      .then((res) => res[0]);
    cookies().set("user_id", user.id);
  } catch (e) {}

  console.log("user", username);
  return { message: "ok" };
}
