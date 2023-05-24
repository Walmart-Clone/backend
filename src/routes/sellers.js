const express = require("express");

const { getAllSellers, getSeller } = require("../controllers/sellers");

const router = express.Router();

router.get("/", getAllSellers);

router.get("/:id", getSeller);

module.exports = router;
