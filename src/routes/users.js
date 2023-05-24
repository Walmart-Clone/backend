const express = require("express");

const authenticate = require("../middlewares/authn");
const authorize = require("../middlewares/authz");
const { User, validateUser } = require("../models/user");
const validate = require("../middlewares/validate");

const {
  getMe,
  // getAllUsers,
  // getAllCustomers,
  // getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const router = express.Router();

router.get("/me", [authenticate], getMe);

router.post("/", validate(validateUser), addUser);

router.put("/:id", [authenticate, validate(validateUser)], updateUser);

router.delete("/:id", [authenticate], deleteUser);

module.exports = router;

// TODO: AUTH
