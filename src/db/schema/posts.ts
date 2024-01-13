import {
  AnyPgColumn,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { media } from "./media";
import { users } from "./users";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  mediaId: integer("media_id").references(() => media.id),
  replyId: integer("reply_id").references((): AnyPgColumn => posts.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Posts = typeof posts.$inferSelect;
export type NewPosts = typeof posts.$inferInsert;
