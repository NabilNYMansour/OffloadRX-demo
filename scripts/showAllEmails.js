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

async function showEmails() {
  console.log("id,name,email,hasMessages");
  const emailList = await db.select().from(emailTable);
  for (let entry of emailList) {
    const hasMessages = (await db.select({ count: count() })
      .from(messageTable)
      .where(eq(messageTable.emailId, entry.id)))[0].count > 0;
    
    console.log(entry.id + "," + entry.name + "," + entry.email + "," + hasMessages);
  }
}
showEmails();