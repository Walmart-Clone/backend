const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  items: [
    {
      item: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        discount: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

exports.Cart = Cart;

/*
TODO:
	- Use Joi for validation -- would you humbly explain this?
	- Think of some static/instance methods to spice it up
		- Discount percentage-to-price conversion
*/
