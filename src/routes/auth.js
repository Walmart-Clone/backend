const express = require("express");

const { httpValidateAuth, validateAuth } = require("../controllers/auth");
const validate = require("../middlewares/validate");

const router = express.Router();

router.post("/", validate(validateAuth), httpValidateAuth);

module.exports = router;
