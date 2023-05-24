const _ = require("lodash");
const mongoose = require("mongoose");
const asyncWrapper = require("../middlewares/async");
const { Order } = require("../models/order");

// GET /
const getAllOrders = asyncWrapper(async (req, res) => {
  const orders = await Order.find().sort({ date: 1 });

  return res.status(200).send(orders);
});

// GET /id
const getOrder = asyncWrapper(async (req, res) => {
  const id = req.params.id;

  const order = await Order.findById(id);
  // const order = await Order.findOne(name);

  return res.status(200).send(order);
});

// POST /
const addOrder = asyncWrapper(async (req, res) => {
  const { cart, date, status } = req.body;

  if (!cart.checkedout)
    return res.status(400).json({ error: "Cart not checkedout" });

  const order = new Order(cart, date, status);
  order = await order.save();

  return res.status(201).json(order);
});

module.exports = {
  getAllOrders,
  getOrder,
  addOrder,
};
