"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { posts as postsTable } from "@/db/schema/posts";

export async function createPost(content: string, id: string) {
  if (!content || content.length < 3) {
    return { error: "not enough content" };
  }

  try {
    await db.insert(postsTable).values({
      content,
      userId: id,
    });
  } catch (error) {
    console.error(error);
    return { error: "something went wrong" };
  }

  revalidatePath("/");
  redirect(`/`);
}
