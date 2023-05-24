const express = require("express");

const authenticate = require("../middlewares/authn");
const authorize = require("../middlewares/authz");
const { Product, validateProduct } = require("../models/product");
const validate = require("../middlewares/validate");

const {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProduct);

router.post(
  "/",
  [authenticate, authorize("seller"), validate(validateProduct)],
  addProduct
);

router.put(
  "/:id",
  [authenticate, authorize("seller"), validate(validateProduct)],
  updateProduct
);

router.delete("/:id", [authenticate, authorize("seller")], deleteProduct);

module.exports = router;
