import { db } from "@/db";
import { media as mediaTable } from "@/db/schema/media";
import { posts as postsTable } from "@/db/schema/posts";
import { users as usersTable } from "@/db/schema/users";
import { desc, eq, sql } from "drizzle-orm";

export const baseQuery = db
  .select({
    id: postsTable.id,
    content: postsTable.content,
    createdAt: postsTable.createdAt,
    user: {
      id: usersTable.id,
      name: usersTable.name,
      image: usersTable.image,
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
  .leftJoin(mediaTable, eq(mediaTable.id, postsTable.mediaId));

export type PostT = Awaited<ReturnType<typeof baseQuery.execute>>[0];

export const postsFeedQuery = baseQuery
  .orderBy(desc(postsTable.createdAt))
  .prepare("posts_for_feed");

export const userPostsQuery = baseQuery
  .where(eq(usersTable.id, sql.placeholder("id")))
  .orderBy(desc(postsTable.createdAt))
  .prepare("posts_for_user_feed");

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
