const express = require("express");

const authenticate = require("../middlewares/authn");
const authorize = require("../middlewares/authz");
const { Order, validateOrder } = require("../models/order");
const validate = require("../middlewares/validate");

const { getAllOrders, getOrder, addOrder } = require("../controllers/orders");

const router = express.Router();

router.get("/", [authenticate, authorize("customer")], getAllOrders);

router.get("/:id", [authenticate, authorize("customer")], getOrder);

router.post(
  "/",
  [authenticate, authorize("customer"), validate(validateOrder)],
  addOrder
);

module.exports = router;
