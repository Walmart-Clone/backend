const chalk = require("chalk");
const config = require("config");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = `mongodb+srv://ahmadmashaal01:ahmad123@cluster.iboc46f.mongodb.net/`;
    // const db = config.get("MONGO_URL");

    await mongoose.connect(db);
    console.log(chalk.green(`Connected to ${db}`));
  } catch (error) {
    console.log(chalk.hex("#FF0000")`${error}`);
  }
};
 
module.exports = connectDB;


//--------------------------------MONGODB
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://ahmadmashaal01:ahmad123@cluster.iboc46f.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// module.exports = run;


