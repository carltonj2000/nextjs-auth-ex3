import SubmitButton from "@/app/create-post/submit-button";
import { db } from "@/db";
import { posts } from "@/db/schema/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function CreatePost() {
  async function handleCreatePost(data: FormData) {
    "use server";
    const content = data.get("content") as string;

    const result = await db
      .insert(posts)
      .values({
        content,
        userId: "1",
      })
      .returning();

    console.log(result);
    revalidatePath("/");
    redirect("/");
  }
  return (
    <main className="text-center mt-10">
      <form
        className="border border-neutral-500 rounded-lg px-6 py-4 flex flex-col gap-4"
        action={handleCreatePost}
      >
        <label className="w-full">
          <textarea
            className="bg-transparent flex-1 border-none outline-none w-full"
            name="content"
            placeholder="Post a thing..."
            required
          />
        </label>

        <SubmitButton />
      </form>
    </main>
  );
}
