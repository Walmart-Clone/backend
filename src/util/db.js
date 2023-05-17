const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = async () => {
  const db = process.env.DB_CONNECTION_STRING;
  await mongoose.connect(db);
  console.log(chalk.green(`Connected to ${db}`));
};

module.exports = connectDB;
