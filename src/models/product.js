const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const { Seller } = require("./seller");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 255,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 1,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  type: {
    type: String,
    default: "No type",
    minLength: 3,
    maxLength: 255,
  },
  category: {
    type: String,
    default: "Uncategorized",
    minLength: 3,
    maxLength: 255,
  },
  sellerId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Seller",
  },
});

const Product = mongoose.model("Product", productSchema);

const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(255),
    stock: Joi.number().required().min(0).default(1),
    discount: Joi.number().min(0).max(100).default(0),
    type: Joi.string().default("No type").min(3).max(255),
    category: Joi.string().default("Uncategorized").min(3).max(255),
    sellerId: Joi.objectId().required(),
  });

  return schema.validate(product);
};

module.exports = { Product, validateProduct };
