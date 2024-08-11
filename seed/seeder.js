import categories from "./categories.js";
import prices from "./prices.js";

import Category from "../models/category.js";
import Price from "../models/price.js";

import db from "../config/db.js";

const importData = async () => {
  try {
    // authenticate
    await db.authenticate();

    // generate columns
    await db.sync();

    // insert data
    await Promise.all([
      Category.bulkCreate(categories),
      Price.bulkCreate(prices),
    ]);

    console.log("Data imported successfully!");
    process.exit();
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await db.sync({ force: true });

    console.log("Data flushed successfully!");
    process.exit();
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importData();
}

if (process.argv[2] === "-f") {
  deleteData();
}
