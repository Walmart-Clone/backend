const express = require("express");

const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");

const app = express();

app.use(express.json());

app.use("/products", productsRouter);
app.use("/users", usersRouter);

// app.use("/sellers", sellersRouter);
// app.use("/carts", cartsRouter);

app.get("/*", (req, res) => {
  res.status(200).json(`https://www.youtube.com/watch?v=bOZT-UpRA2Y`);
});

module.exports = app;
