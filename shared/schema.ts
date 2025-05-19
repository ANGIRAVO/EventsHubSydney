import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

// Event schema
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(), // Format can be varied like "Aug 24-28, 2023" or "Dec 3, 2023 • 8:00 PM"
  location: text("location").notNull(),
  imageUrl: text("image_url").notNull(),
  price: text("price").notNull(), // Format varies like "$25.00 - $75.00" or "Free entry"
  category: text("category").notNull(),
  ticketUrl: text("ticket_url").notNull(),
  popular: boolean("popular").default(false),
  isNew: boolean("is_new").default(false),
  sourceUrl: text("source_url").notNull(),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  lastUpdated: true,
});

// Email subscription schema
export const emailSubscriptions = pgTable("email_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").notNull().defaultNow(),
});

export const insertEmailSubscriptionSchema = createInsertSchema(emailSubscriptions).pick({
  email: true,
});

// Workflow schema
export const workflows = pgTable("workflows", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  configuration: jsonb("configuration").notNull(), // Stores workflow configuration as JSON
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertWorkflowSchema = createInsertSchema(workflows).omit({
  id: true,
  createdAt: true,
});

// Template schema
export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTemplateSchema = createInsertSchema(templates).omit({
  id: true,
  createdAt: true,
});

// Email capture before ticket redirection
export const ticketEmails = pgTable("ticket_emails", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  eventId: integer("event_id").references(() => events.id),
  createWorkflow: boolean("create_workflow").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTicketEmailSchema = createInsertSchema(ticketEmails).pick({
  email: true,
  eventId: true,
  createWorkflow: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type EmailSubscription = typeof emailSubscriptions.$inferSelect;
export type InsertEmailSubscription = z.infer<typeof insertEmailSubscriptionSchema>;

export type Workflow = typeof workflows.$inferSelect;
export type InsertWorkflow = z.infer<typeof insertWorkflowSchema>;

export type Template = typeof templates.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;

export type TicketEmail = typeof ticketEmails.$inferSelect;
export type InsertTicketEmail = z.infer<typeof insertTicketEmailSchema>;
