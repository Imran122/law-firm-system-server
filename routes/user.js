const express = require("express");
const router = express.Router();

// import controller
const { authenticate } = require("../middleware/authurize");
const { read } = require("../controllers/user");

router.get("/user/:id", authenticate, read);

module.exports = router;
