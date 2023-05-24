const mongoose = require("mongoose");

const asyncWrapper = require("../middlewares/async");
const { Product } = require("../models/product");

// GET /
const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find().sort({ name: 1 });

  return res.status(200).send(products);
});

// GET /id
const getProduct = asyncWrapper(async (req, res) => {
  const name = req.params.id;

  const product = await Product.findOne({ name });

  return res.status(200).send(product);
});

// POST /
const addProduct = asyncWrapper(async (req, res) => {
  const {
    name,
    quantity: stock,
    discount,
    type,
    category,
    sellerId,
  } = req.body;

  const product = await Product.create({
    name,
    stock,
    discount,
    type,
    category,
    sellerId,
  });

  return res.status(201).send(product);
});

// UPDATE /id
const updateProduct = asyncWrapper(async (req, res) => {
  const productName = req.params.id;
  const { name, stock, discount, type, category, sellerId } = req.body;

  const updatedProduct = await Product.findOneAndUpdate(
    { name: productName },
    { name, stock, discount, type, category, sellerId },
    { new: true }
  );

  return res.status(201).send(updatedProduct);
});

// DELETE /id
const deleteProduct = asyncWrapper(async (req, res) => {
  const name = req.params.id;

  const product = await Product.findOneAndDelete({ name });

  return res.status(200).send(product);
});

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
