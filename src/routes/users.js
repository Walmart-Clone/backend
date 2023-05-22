const express = require("express");

const {
  getAllUsers,
  getAllCustomers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const router = express.Router();

router.get("/users", getAllUsers);

router.get("/customers", getAllCustomers);

router.get("/:id", getUser);

router.post("/addU", addUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
