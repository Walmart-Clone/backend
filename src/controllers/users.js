const _ = require("lodash");
const mongoose = require("mongoose");
const asyncWrapper = require("../middlewares/async");
const { User } = require("../models/user");

// GET all users /
const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find().sort({ name: 1 });

  return res.status(200).send(users);
});

// GET all customers /
const getAllCustomers = asyncWrapper(async (req, res) => {
  const customers = await User.find({role: "customer"}).sort({ name: 1 });

  return res.status(200).send(customers);
});

// GET /id
const getUser = asyncWrapper(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  return res.status(200).send(user);
});

// POST /
const addUser = asyncWrapper(async (req, res) => {
  const { username, email, password, name, age, gender, role } = _.pick(
    req.body,
    ["username", "email", "password", "name", "age", "gender", "role"]
  );

  const user = await User.create({
    username,
    email,
    password,
    name,
    age,
    gender,
    role,
  });

  return res.status(201).send(user);
});

// UPDATE /id
const updateUser = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const { username, email, password, name, age, gender, role } = _.pick(
    req.body,
    ["username", "email", "password", "name", "age", "gender", "role"]
  );

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { username, email, password, name, age, gender, role },
    { new: true }
  );

  return res.status(201).send(updatedUser);
});

// DELETE /id
const deleteUser = asyncWrapper(async (req, res) => {
  const id = req.params.id;

  const user = await User.findByIdAndRemove(id);

  if (!user) return res.status(404).send(`User doesn't exist`);
  return res.status(200).send(user);
});

module.exports = {
  getAllUsers,
  getAllCustomers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};

// TODO:
// - add auth middleware to allow only admin to fetch all users data
// - add cartId to various controllers
