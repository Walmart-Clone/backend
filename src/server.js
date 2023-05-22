const chalk = require("chalk");
const http = require("http");
const app = require("./app");
const connectDB = require("./util/db");

require("dotenv").config();

const server = http.createServer(app);

const port = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error(error);
  }

  server.listen(port, () => {
    console.log(chalk.hex("#00FF00")`Server running on port ${port}...`);
  });
};

startServer();

// const startApp = async () => {
//   try {
//     await connectDB();
//     app.listen(port, () => {
//       console.log(chalk.hex("#00FF00")`Server running on port ${port}...`);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// startApp();
