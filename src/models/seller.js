const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      id: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
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
    },
  ],
});

const Seller = mongoose.model("Seller", sellerSchema);

const validateSeller = (seller) => {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    products: Joi.array()
      .items(
        Joi.object({
          id: Joi.objectId().required(),
          stock: Joi.number().required().min(0).default(1),
          discount: Joi.number().min(0).max(100).default(0),
        })
      )
      .required(),
  });

  return schema.validate(seller);
};

module.exports = { Seller, validateSeller };
