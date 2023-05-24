const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const { Cart } = require("./cart");

const orderSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Cart",
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
  status: {
    type: String,
    required: false,
    default: "Pending",
    enum: ["Delivered", "Pending"],
  },
});

const Order = mongoose.model("Order", orderSchema);

const validateOrder = (order) => {
  const schema = Joi.object({
    cart: Joi.objectId().required(),
    date: Joi.date().required().default(new Date()),
    status: Joi.string().default("Pending").valid("Delivered", "Pending"),
  });

  return schema.validate(order);
};

module.exports = { Order, validateOrder };
