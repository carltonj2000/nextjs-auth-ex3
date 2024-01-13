import { type Result as Post } from "@/db/queries/postFeed";

export default function FeedPost({ post }: { post: Post }) {
  return (
    <div>
      <h2>{post.user.username}</h2>
      <p>{post.content}</p>
    </div>
  );
}
