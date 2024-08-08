var fs = require('fs');
const { drizzle } = require('drizzle-orm/better-sqlite3');
const Database = require('better-sqlite3');
const { integer, sqliteTable, text } = require('drizzle-orm/sqlite-core');
const { count, eq } = require('drizzle-orm');

const betterSqlite = new Database('.sqlite.db');
const db = drizzle(betterSqlite);

const emailTable = sqliteTable('email', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
});
const messageTable = sqliteTable('message', {
  id: integer('id').primaryKey(),
  emailId: integer('email_id').notNull().references(() => emailTable.id),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
});

async function showMessages() {
  const messages = await db.select().from(messageTable);
  for (let message of messages) {
    console.log("===================================================");
    const emailEntry = (await db.select().from(emailTable).where(eq(emailTable.id, message.emailId)))[0];
    console.log("Message ID:", message.id);
    console.log("From:", emailEntry.name, "<" + emailEntry.email + ">", "ID:", emailEntry.id);
    console.log("Subject:", message.subject);
    console.log("Message:", message.message);
  }
}
showMessages();