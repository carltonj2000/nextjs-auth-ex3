import { db } from "@/db";
import { users as usersTable } from "@/db/schema/users";
import { eq } from "drizzle-orm";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function Profile() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/me");
  }
  const userId = "1";

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .then((result) => result[0]);
  return (
    <>
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <code>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </code>
    </>
  );
}

export default Profile;
