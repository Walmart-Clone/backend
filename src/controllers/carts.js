const mongoose = require("mongoose");

const asyncWrapper = require("../middlewares/async");
const { Cart } = require("../models/cart");

// GET /id
const getCartByUserId = asyncWrapper(async (req, res) => {
  const userId = req.params.id;

  const cart = await Cart.findOne({ userId: userId });

  if (!cart) return res.status(404).json({ error: "Cart doesn't exist" });

  return res.status(200).send(cart);
});

// UPDATE /id
const updateCartByUserId = asyncWrapper(async (req, res) => {
  const userId = req.params.id;
  const { items, checkedout } = req.body;

  let cart = await Cart.findOne({ userId: userId });

  if (!cart) return res.status(404).json({ error: "Cart doesn't exist" });

  cart.items = items;
  cart.checkedout = checkedout;

  const updatedCart = await Cart.save();

  return res.status(201).json(updatedCart);
});

// DELETE /id
const emptyCartByUserId = asyncWrapper(async (req, res) => {
  const userId = req.params.id;

  let cart = await Cart.findOne({ userId: userId });

  cart.items = [];
  cart.checkedout = false;

  if (!cart) return res.status(404).json({ error: "Cart doesn't exist" });

  return res.status(200).send(cart);
});

module.exports = {
  getCartByUserId,
  updateCartByUserId,
  emptyCartByUserId,
};
