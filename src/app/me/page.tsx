import { auth } from "@/auth";
import FeedPost from "@/components/feed-post";
import { userPostsQuery } from "@/db/queries/postFeed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/me");
  }
  const { user } = session;
  const posts = await userPostsQuery.execute({ id: session.user.id });

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-semibold">{user.name}</h2>
        </div>
        <Link href={user.image}>
          <div className="rounded-full h-20 w-20 overflow-hidden relative">
            <Image
              className="object-cover"
              src={session.user.image}
              alt={user.name}
              quality={100}
              priority={true}
              fill={true}
            />
          </div>
        </Link>
      </div>
      <div>
        {posts.map((post) => (
          <FeedPost key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

export default ProfilePage;
