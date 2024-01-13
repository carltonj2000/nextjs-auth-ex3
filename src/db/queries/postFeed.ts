import { db } from "@/db";
import { media as mediaTable } from "@/db/schema/media";
import { posts as postsTable } from "@/db/schema/posts";
import { users as usersTable } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export const query = db
  .select({
    id: postsTable.id,
    content: postsTable.content,
    createdAt: postsTable.createdAt,
    user: {
      id: usersTable.id,
      username: usersTable.username,
      avatar: usersTable.avatar,
    },
    media: {
      id: mediaTable.id,
      type: mediaTable.type,
      url: mediaTable.url,
      width: mediaTable.width,
      height: mediaTable.height,
    },
  })
  .from(postsTable)
  .innerJoin(usersTable, eq(usersTable.id, postsTable.userId))
  .leftJoin(mediaTable, eq(mediaTable.id, postsTable.mediaId))
  .prepare("select_posts_for_feed");

export type Result = Awaited<ReturnType<typeof query.execute>>[0];

// const posts = await db.select().from(postsTable);

// const posts = await db
//   .select()
//   .from(postsTable)
//   .innerJoin(usersTable, eq(usersTable.id, postsTable.userId));

// const posts = await db
//   .select()
//   .from(postsTable)
//   .innerJoin(usersTable, eq(usersTable.id, postsTable.userId))
//   .leftJoin(mediaTable, eq(mediaTable.id, postsTable.mediaId));

//   const posts = await db
//     .select({
//       id: postsTable.id,
//       content: postsTable.content,
//       createdAt: postsTable.createdAt,
//       user: {
//         id: usersTable.id,
//         username: usersTable.username,
//         avatar: usersTable.avatar,
//       },
//       media: {
//         id: mediaTable.id,
//         type: mediaTable.type,
//         url: mediaTable.url,
//         width: mediaTable.width,
//         height: mediaTable.height,
//       },
//     })
//     .from(postsTable)
//     .innerJoin(usersTable, eq(usersTable.id, postsTable.userId))
//     .leftJoin(mediaTable, eq(mediaTable.id, postsTable.mediaId));
