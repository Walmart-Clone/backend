const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const { Product } = require("./product");
const { User } = require("./user");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  items: [
    {
      id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Product",
      },
      quantityPurchased: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  checkedout: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

const validateCart = (cart) => {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    items: Joi.array()
      .items(
        joi.object({
          id: Joi.objectId().required(),
          quantityPurchased: Joi.number().min(1).required(),
        })
      )
      .required(),
    checkedout: Joi.boolean(),
  });

  return schema.validate(cart);
};

module.exports = { Cart, validateCart };
