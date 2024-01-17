import FeedPost from "@/components/feed-post";
import { postsFeedQuery } from "@/db/queries/postFeed";

export default async function Home() {
  const posts = await postsFeedQuery.execute();
  return (
    <main className="text-center mt-10">
      <h1>Threads</h1>
      <p>Threads is a clone of x.com</p>
      {posts.map((post) => (
        <FeedPost key={post.content} post={post} />
      ))}
    </main>
  );
}
