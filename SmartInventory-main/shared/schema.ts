import { pgTable, text, serial, integer, boolean, doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("staff"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  role: true,
});

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
});

// Locations table
export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const insertLocationSchema = createInsertSchema(locations).pick({
  name: true,
});

// Inventory items table
export const inventoryItems = pgTable("inventory_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  sku: text("sku").notNull().unique(),
  description: text("description"),
  categoryId: integer("category_id"),
  locationId: integer("location_id"),
  quantity: integer("quantity").notNull().default(0),
  price: doublePrecision("price"),
  lowStockThreshold: integer("low_stock_threshold"),
  lastUpdated: timestamp("last_updated").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  barcode: text("barcode"),
});

export const insertInventoryItemSchema = createInsertSchema(inventoryItems).pick({
  name: true,
  sku: true,
  description: true,
  categoryId: true,
  locationId: true,
  quantity: true,
  price: true,
  lowStockThreshold: true,
  barcode: true,
});

export const updateInventoryItemSchema = createInsertSchema(inventoryItems).pick({
  name: true,
  sku: true,
  description: true,
  categoryId: true,
  locationId: true,
  quantity: true,
  price: true,
  lowStockThreshold: true,
  barcode: true,
}).partial();

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Location = typeof locations.$inferSelect;
export type InsertLocation = z.infer<typeof insertLocationSchema>;

export type InventoryItem = typeof inventoryItems.$inferSelect;
export type InsertInventoryItem = z.infer<typeof insertInventoryItemSchema>;
export type UpdateInventoryItem = z.infer<typeof updateInventoryItemSchema>;

// Extended inventory item with category and location names
export type InventoryItemWithDetails = InventoryItem & {
  categoryName?: string;
  locationName?: string;
};
