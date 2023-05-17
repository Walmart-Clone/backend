const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 6,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxLength: 1024,
  },
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  age: {
    type: Number,
    required: true,
    min: 6,
    max: 100,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  role: {
    type: String,
    default: "customer",
    enum: ["customer", "seller"],
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    // default: null,
    // unique: true,
    // -> (default: null && unique: true) is not possible
    // ref: "Cart",
  },
});

const User = mongoose.model("User", userSchema);

exports.User = User;

/*
TODO:
	- Use Joi for validation
	- Think of some static/instance methods to spice it up
	- Work out cartId problem dumbass
*/
