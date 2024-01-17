import CreatePost from "@/app/create-post/create-post";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function CreatePostPage() {
  const session = await auth();
  if (!session?.user) redirect("/api/auth/signin?callbackUrl=/create-post");
  return <CreatePost id={session.user.id} />;
}

export default CreatePostPage;
