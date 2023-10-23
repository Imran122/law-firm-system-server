const express = require("express");

const router = express.Router();
// import controller
const { create } = require("../controllers/libraryPaymentData");
const { authenticate } = require("../middleware/authurize");
router.post("/library-payment-data-send", authenticate, create);
module.exports = router;
