const _ = require("lodash");
const mongoose = require("mongoose");
const asyncWrapper = require("../middlewares/async");
const { Seller } = require("../models/seller");



// GET all sellers /
const getAllSellers = asyncWrapper(async (req, res) => {
  const sellers = await Seller.find({role: "seller"}).sort({ name: 1 });

  return res.status(200).send(sellers);
});

// GET /id
const getSeller = asyncWrapper(async (req, res) => {
  const id = req.params.id;

  const seller = await Seller.findById(id);

  return res.status(200).send(seller);
});

// POST /
const addSeller = asyncWrapper(async (req, res) => {
  const { name, products } = _.pick(req.body, ["name", "products"]);

  const seller = await Seller.create({
    name,
    products: [
      {
        product: {
          id: new mongoose.Types.ObjectId(),
          name: "a name of a product",
          quantity: 50,
          discount: 10,
        },
      },
    ],
  });

  return res.status(201).send(seller);
});


// UPDATE /id
const updateSeller = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const { name, products} = _.pick(
    req.body,
    [name, products]
  );

  const updatedSeller = await Seller.findByIdAndUpdate(
    id,
    { name, products: [
      {
        product: {
          id: new mongoose.Types.ObjectId(),
          name: "a name of a product",
          quantity: 500,
          discount: 11,
        },
      },
    ],
  },
    { new: true }
  );

  return res.status(201).send(updatedSeller);
});

// DELETE /id
const deleteSeller = asyncWrapper(async (req, res) => {
  const id = req.params.id;

  const seller = await Seller.findByIdAndRemove(id);

  if (!seller) return res.status(404).send(`Seller doesn't exist`);
  return res.status(200).send(seller);
});

module.exports = {
    addSeller,
    getAllSellers,
    getSeller,
    updateSeller,
    deleteSeller,
};

// TODO:
// - add auth middleware to allow only admin to fetch all users data
// - add cartId to various controllers
