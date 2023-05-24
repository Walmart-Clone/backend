const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { Product } = require("./product");

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
    lowercase: true,
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
    required: true,
    default: "customer",
    enum: ["customer", "seller"],
  },
  cart: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.jwtPrivateKey
  );

  return token;
};

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(50).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    name: Joi.string().min(5).max(50).required(),
    age: Joi.number().min(6).max(100).required(),
    gender: Joi.string().valid("male", "female").required(),
    role: Joi.string()
      .valid("customer", "seller")
      .required()
      .default("customer"),
    cart: Joi.array().items(Joi.objectId()).default([]),
  });

  return schema.validate(user);
};

const User = mongoose.model("User", userSchema);

module.exports = { User, validateUser };
