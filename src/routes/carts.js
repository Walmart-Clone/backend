const express = require("express");

const authenticate = require("../middlewares/authn");
const authorize = require("../middlewares/authz");
const { Cart, validateCart } = require("../models/cart");
const validate = require("../middlewares/validate");

const {
  getCartByUserId,
  updateCartByUserId,
  emptyCartByUserId,
} = require("../controllers/carts");

const router = express.Router();

router.get("/:id", [authenticate, authorize("customer")], getCartByUserId);

router.put(
  "/:id",
  [authenticate, authorize("customer"), validate(validateCart)],
  updateCartByUserId
);

router.delete("/", [authenticate, authorize("customer")], emptyCartByUserId);

module.exports = router;
