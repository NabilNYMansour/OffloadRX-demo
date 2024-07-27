var fs = require('fs');
var { parse } = require('csv-parse');
const { drizzle } = require('drizzle-orm/better-sqlite3');
const Database = require('better-sqlite3');
const { integer, sqliteTable, text } = require('drizzle-orm/sqlite-core');
const { faker } = require('@faker-js/faker');
const { exit } = require('process');

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function formatMonthYear(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${month}/${year}`;
}

console.log("migrator> Creating db connection");
const betterSqlite = new Database('.sqlite.db');
const db = drizzle(betterSqlite);

console.log("migrator> Creating table object");
const medicineTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(), // Medicine Name
  composition: text('composition').notNull(), // Composition
  imgUrl: text('imgUrl').notNull(), // Image URL
  city: text('city').notNull(), // City
  street: text('street').notNull(), // Street
  zip: text('zip').notNull(), // Zip
  price: text('price').notNull(), // Price
  expiry: text('expiry').notNull(), // Expiry
  lotNumber: text('lot_number').notNull(), // Lot Number
  datePosted: text('date_posted').notNull(), // Date Posted
  description: text('description').notNull(), // Description
  slug: text('slug').notNull(), // Slug
});

console.log("migrator> started reading");
let index = 0;
const total = 11825;
fs.createReadStream("./data/Medicine_Details.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", async function (row) {
    const name = row[0];
    const composition = row[1];
    const imgUrl = row[4];
    const city = faker.location.city();
    const street = faker.location.streetAddress();
    const letters = makeid(3);
    const zip = faker.location.zipCode(letters[0] + "#" + letters[1] + " #" + letters[2] + "#");
    const price = faker.commerce.price({
      min: 50,
      max: 5000,
      symbol: "$",
    });
    const expiry = "EXP" + formatMonthYear(faker.date.future({ years: 3 }));
    const lotNumber = "LOT#" + faker.location.zipCode("#####");
    const datePosted = faker.date.past({ years: 1 }).toISOString();
    const description = faker.lorem.paragraph({ max: 5, min: 1 });
    const slug = crypto.randomUUID().replace(/-/g, '');

    const medicine = {
      name,
      composition,
      imgUrl,
      city,
      street,
      zip,
      price,
      expiry,
      lotNumber,
      datePosted,
      description,
      slug,
    };
    process.stdout.write(`migrator> done ${index * 100 / total}%\r`);
    await db.insert(medicineTable).values(medicine);
    index++;
  }).on("end", function () {
    console.log("migrator> finished reading");
  }).on("error", function (error) {
    console.log("migrator> error reading");
    console.log(error.message);
  });
