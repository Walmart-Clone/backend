const _ = require("lodash");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const asyncWrapper = require("../middlewares/async");
const { User } = require("../models/user");

// No admin yet -> no getUser/getAllUsers/getAllCustomers
//
// GET all users /
const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find().sort({ name: 1 });

  return res.status(200).send(users);
});

// GET all customers /
// const getAllCustomers = asyncWrapper(async (req, res) => {
//   const customers = await User.find({ role: "customer" }).sort({ name: 1 });

//   return res.status(200).send(customers);
// });

// // GET /id
// const getUser = asyncWrapper(async (req, res) => {
//   const id = req.params.id;

//   const user = await User.findById(id);

//   return res.status(200).send(user);
// });

// GET /me
const getMe = asyncWrapper(async (req, res) => {
  const email = req.user.email;
  const user = await User.findOne({ email }).select("-password");

  res.send(user);
});

// POST /
const addUser = asyncWrapper(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("User already registered.");

  const { username, email, password, name, age, gender, role } = req.body;

  user = new User({ username, email, password, name, age, gender, role });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  return res
    .header("x-auth-token", token)
    .send(
      _.pick(user, [
        "_id",
        "username",
        "email",
        "name",
        "age",
        "gender",
        "role",
      ])
    );
});

// UPDATE /id
const updateUser = asyncWrapper(async (req, res) => {
  const emailAsId = req.params.id;

  const { username, email, password, name, age, gender, role } = _.pick(
    req.body,
    ["username", "email", "password", "name", "age", "gender", "role"]
  );

  let user = await User.findOne({ emailAsId });

  if (!user) return res.status(404).json({ error: "User not found." });

  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  user.username = username;
  user.name = name;
  user.age = age;
  user.gender = gender;
  user.role = role;

  const updatedUser = await user.save();

  return res.status(201).json(updatedUser);
});

// DELETE /id
const deleteUser = asyncWrapper(async (req, res) => {
  const emailAsId = req.params.id;

  const user = await User.findOneAndRemove({ email });

  if (!user) return res.status(404).json({ error: "User doesn't exist" });

  return res.status(200).send(user);
});

module.exports = {
  getMe,
  getAllUsers,
  // getAllCustomers,
  // getUser,
  addUser,
  updateUser,
  deleteUser,
};
