const _ = require("lodash");
const mongoose = require("mongoose");
const asyncWrapper = require("../middlewares/async");
const { Seller } = require("../models/seller");

// GET /
const getAllSellers = asyncWrapper(async (req, res) => {
  const sellers = await Seller.find({}, { name: 1 }).sort({ name: 1 });

  return res.status(200).send(sellers);
});

// GET /id
const getSeller = asyncWrapper(async (req, res) => {
  const name = req.params.id;

  const seller = await Seller.findOne({ name });

  return res.status(200).send(seller);
});

module.exports = {
  getAllSellers,
  getSeller,
};
