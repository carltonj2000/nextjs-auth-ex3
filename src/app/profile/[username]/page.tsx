import { db } from "@/db";
import { users as usersTable, type User } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function Profile() {
  const username = cookies().get("login")?.value;
  const userId = cookies().get("user_id")?.value;

  if (!userId || !username) {
    redirect("/login");
    return;
  }

  let user: User | undefined;

  try {
    user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.name, username))
      .then((result) => result[0]);
  } catch (e: any) {
    console.error(e);
    return <div>error connecting to database</div>;
  }

  if (!user) {
    return <h1>User not found =&gt; {username}</h1>;
  }

  return (
    <>
      <h1>
        {user.firstName} {user.lastName}
      </h1>
    </>
  );
}

export default Profile;
