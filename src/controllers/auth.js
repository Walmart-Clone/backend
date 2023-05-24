const bcrypt = require("bcrypt");
const Joi = require("joi");
const { JsonWebTokenError } = require("jsonwebtoken");

const { User } = require("../models/user");
const validate = require("../middlewares/validate");

const httpValidateAuth = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Invalid email");

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) res.status(400).send("Invalid password");

  const token = user.generateAuthToken();
  res.send(token);
};

const validateAuth = (req) => {
  const schema = Joi.object({
    // username: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(req);
};

module.exports = { httpValidateAuth, validateAuth };
