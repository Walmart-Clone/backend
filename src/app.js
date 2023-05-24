const express = require("express");
const morgan = require("morgan");

const authRouter = require("./routes/auth");
//const cartsRouter = require("./routes/carts");
//const ordersRouter = require("./routes/orders");
//const productsRouter = require("./routes/products");
const sellersRouter = require("./routes/sellers");
const usersRouter = require("./routes/users");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", authRouter);
// app.use("/carts", cartsRouter);
//app.use("/orders", ordersRouter);
//app.use("/products", productsRouter);
app.use("/sellers", sellersRouter);
app.use("/users", usersRouter);

app.get("/*", (req, res) => {
  res.status(200).json(`https://www.youtube.com/watch?v=bOZT-UpRA2Y`);
});

module.exports = app;
