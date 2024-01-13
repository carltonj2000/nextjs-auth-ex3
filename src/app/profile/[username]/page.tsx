import { db } from "@/db";
import { users as usersTable, type User } from "@/db/schema/users";
import { eq } from "drizzle-orm";

type ProfileProps = {
  params: {
    username: string;
  };
};
async function Profile({ params }: ProfileProps) {
  let user: User | undefined;

  try {
    user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, params.username))
      .then((result) => result[0]);
  } catch (e: any) {
    console.error(e);
    return <div>error connecting to database</div>;
  }

  if (!user) {
    return <h1>User not found =&gt; {params.username}</h1>;
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
