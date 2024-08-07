import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const medicineTable = sqliteTable('medicine', {
  id: integer('id').primaryKey(),

  name: text('name').notNull(), // Medicine Name
  composition: text('composition').notNull(), // Composition

  imgUrl: text('imgUrl').notNull(), // Image URL
  price: real('price'), // Price
  forSale: integer('for_sale', { mode: 'boolean' }).notNull(), // For Sale 1 for sale, 0 for wanted

  city: text('city').notNull(), // City
  street: text('street').notNull(), // Street
  postal: text('postal').notNull(), // Postal
  phoneNumber: text('phone_number').notNull(), // Phone Number
  email: text('email').notNull(), // Email

  datePosted: integer('date_posted', { mode: 'timestamp' }).notNull(), // Date Posted

  expiry: integer('expiry', { mode: 'timestamp' }).notNull(), // Expiry
  lotNumber: text('lot_number').notNull(), // Lot Number

  description: text('description').notNull(), // Description
  slug: text('slug').notNull(), // Slug
});

export type InsertMedicine = typeof medicineTable.$inferInsert;
export type SelectMedicine = typeof medicineTable.$inferSelect;

export const emailTable = sqliteTable('email', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
});

export type InsertEmail = typeof emailTable.$inferInsert;
export type SelectEmail = typeof emailTable.$inferSelect;

export const messageTable = sqliteTable('message', {
  id: integer('id').primaryKey(),
  emailId: integer('email_id').notNull().references(() => emailTable.id),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
});

export type InsertMessage = typeof messageTable.$inferInsert;
export type SelectMessage = typeof messageTable.$inferSelect;