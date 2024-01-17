"use server";
import { cookies } from "next/headers";

import { db } from "@/db";
import { users as userTable } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export async function login(name: string) {
  cookies().set("login", name);
  try {
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.name, name))
      .then((res) => res[0]);
    cookies().set("user_id", user.id);
  } catch (e) {}

  return { message: "ok" };
}
