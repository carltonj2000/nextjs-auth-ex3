import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const mediaType = pgEnum("media_type", ["image", "video"]);

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  type: mediaType("type").notNull(),
  url: text("url").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Media = typeof media.$inferSelect;
export type NewMedia = typeof media.$inferInsert;
