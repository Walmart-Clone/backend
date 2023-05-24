const chalk = require("chalk");
const config = require("config");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = `mongodb://localhost/walmart`;
    // const db = config.get("MONGO_URL");

    await mongoose.connect(db);
    console.log(chalk.green(`Connected to ${db}`));
  } catch (error) {
    console.log(chalk.hex("#FF0000")`${error}`);
  }
};

module.exports = connectDB;
