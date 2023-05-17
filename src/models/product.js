const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 255,
  },
  quantity: {
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
  seller: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: True,
      minLength: 5,
      maxLength: 255,
    },
  },
});

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;

/*
TODO:
	- Enum a list of types and another for categories
	- Use Joi for validation
	- Think of some static/instance methods to spice it up
*/
