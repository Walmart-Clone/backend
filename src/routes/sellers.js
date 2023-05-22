const express = require("express");

const {
    addSeller,
    getAllSellers,
    getSeller,
    updateSeller,
    deleteSeller,
} = require ("../controllers/sellers");

const router = express.Router();

router.get("/", getAllSellers);

router.get("/:id", getSeller);

router.post("/", addSeller);

router.put("/:id", updateSeller);

router.delete("/:id", deleteSeller);

module.exports = router;