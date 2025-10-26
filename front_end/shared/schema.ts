import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type EventType = 
  | "flight" 
  | "accommodation" 
  | "food" 
  | "entertainment" 
  | "transit" 
  | "activity";

export interface ItineraryEvent {
  id: string;
  title: string;
  type: EventType;
  time: string;
  location: string;
  description: string;
  duration: string;
  coordinates: [number, number];
}

export interface Itinerary {
  id: string;
  location: string;
  startDate: string;
  endDate: string;
  events: ItineraryEvent[];
}
