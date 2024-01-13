import { db } from "@/db";
import { posts as postsTable } from "@/db/schema/posts";

export default async function Home() {
  const posts = await db.select().from(postsTable);
  console.log(posts);
  return (
    <main className="text-center mt-10">
      <h1>Threads</h1>
      <p>Threads is a clone of x.com</p>
    </main>
  );
}
