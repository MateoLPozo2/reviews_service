import { pgTable, text, serial, integer, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  nid: text("nid").notNull().unique(), // Numeric ID for SEO URLs
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  reviewSummary: text("review_summary").notNull(),
  content: text("content").notNull(), // Markdown content
  authors: json("authors").$type<string[]>().notNull(),
  doi: text("doi").notNull(),
  domain: text("domain").notNull(),
  tags: json("tags").$type<string[]>().notNull(),
  version: text("version").notNull().default("1.0"),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
  wordCount: integer("word_count").notNull(),
  estimatedReadingTime: integer("estimated_reading_time").notNull(),
  reviewAuthor: text("review_author"),
  impactMetrics: json("impact_metrics").$type<Record<string, any>>(),
  reuseLicense: text("reuse_license"),
  sourceAttribution: text("source_attribution"),
  published: integer("published").notNull().default(1), // boolean as integer
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
  lastUpdated: true,
});

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  role: text("role", { enum: ["admin", "reviewer", "public"] }).notNull().default("public"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  role: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
