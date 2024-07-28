var fs = require('fs');
var { parse } = require('csv-parse');
const { drizzle } = require('drizzle-orm/better-sqlite3');
const Database = require('better-sqlite3');
const { integer, real, sqliteTable, text } = require('drizzle-orm/sqlite-core');
const { faker } = require('@faker-js/faker');
const { exit } = require('process');

function randomCityInOntario() {
  const cities = [
      "Toronto",
      "Ottawa",
      "Mississauga",
      "Brampton",
      "Hamilton",
      "London",
      "Markham",
      "Vaughan",
      "Kitchener",
      "Windsor",
      "Richmond Hill",
      "Oakville",
      "Burlington",
      "Greater Sudbury",
      "Oshawa",
      "Barrie",
      "St. Catharines",
      "Guelph",
      "Cambridge",
      "Whitby"
  ];
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
}

function randomCapitalString(length) { // Capitalized only
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

console.log("\n============== Migrator ==============");

console.log("migrator> Creating db connection");
const betterSqlite = new Database('.sqlite.db');
const db = drizzle(betterSqlite);

console.log("migrator> Creating table object");
const medicineTable = sqliteTable('users', {
  id: integer('id').primaryKey(),

  name: text('name').notNull(), // Medicine Name
  composition: text('composition').notNull(), // Composition

  imgUrl: text('imgUrl').notNull(), // Image URL
  price: real('price').notNull(), // Price
  forSale: integer('for_sale', { mode: 'boolean' }).notNull(), // For Sale 1 for sale, 0 for wanted

  city: text('city').notNull(), // City
  street: text('street').notNull(), // Street
  zip: text('zip').notNull(), // Zip
  phoneNumber: text('phone_number').notNull(), // Phone Number
  email: text('email').notNull(), // Email

  datePosted: integer('date_posted', { mode: 'timestamp' }).notNull(), // Date Posted

  expiry: integer('expiry', { mode: 'timestamp' }).notNull(), // Expiry
  lotNumber: text('lot_number').notNull(), // Lot Number

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
    const price = Math.floor(Math.random() * (5000 - 50 + 1)) + 50;
    const forSale = Math.floor(Math.random() * 2);

    const city = randomCityInOntario();
    const street = faker.location.streetAddress();
    const zip = faker.location.zipCode(randomCapitalString(1) + "#" + randomCapitalString(1) + " #" + randomCapitalString(1) + "#");
    const phoneNumber = faker.helpers.fromRegExp("[1-9][0-9]{2}-[0-9]{3}-[0-9]{4}");
    const email = faker.internet.email();

    const datePosted = faker.date.past({ years: 1 });
    
    const expiry = faker.date.future({ years: 3 });
    const lotNumber = "LOT#" + faker.location.zipCode("#####");
    
    const description = faker.lorem.paragraph({ max: 5, min: 1 });
    const slug = crypto.randomUUID().replace(/-/g, '');

    const medicine = {
      name,
      composition,

      imgUrl,
      price,
      forSale,
      
      city,
      street,
      zip,
      phoneNumber,
      email,
      
      datePosted,
      
      expiry,
      lotNumber,
      
      description,
      slug,
    };

    // console.log(medicine);
    // exit();

    process.stdout.write(`migrator> done ${(index * 100 / total).toFixed(2)}%\r`);
    await db.insert(medicineTable).values(medicine);
    index++;
  }).on("end", function () {
    console.log("migrator> finished reading");
  }).on("error", function (error) {
    console.log("migrator> error reading");
    console.log(error.message);
  });
