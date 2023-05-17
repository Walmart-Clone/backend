const http = require("http");

const app = require("./app");
const connectDB = require("./util/db");

const server = http.createServer(app);

const port = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB();

  server.listen(port, () => {
    console.log(`Server running on port ${port}...`);
  });
};
