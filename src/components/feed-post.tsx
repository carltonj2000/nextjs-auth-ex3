import { type PostT } from "@/db/queries/postFeed";

export default function FeedPost({ post }: { post: PostT }) {
  return (
    <div className="flex flex-row space-x-2 justify-center">
      <p>{post.content}</p>
      <p>by</p>
      <h2>{post.user.name}</h2>
    </div>
  );
}
