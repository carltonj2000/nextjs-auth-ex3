import { type Result as Post } from "@/db/queries/postFeed";

export default function FeedPost({ post }: { post: Post }) {
  return (
    <div className="flex flex-row space-x-2 justify-center">
      <p>{post.content}</p>
      <p>by</p>
      <h2>{post.user.username}</h2>
    </div>
  );
}
