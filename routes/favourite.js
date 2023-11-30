const express = require("express");

const router = express.Router();
// import controller
const { authenticate } = require("../middleware/authurize");
const {
  favouriteUpdate,
  favouriteAllInformation,
  favouriteDelete,
  favouriteAllInfoContent,
} = require("../controllers/favourite");

router.post("/favourite-update", authenticate, favouriteUpdate);
router.delete("/favourite-delete", favouriteDelete);
router.get("/favouriteallinfo/:id", authenticate, favouriteAllInformation);
router.get(
  "/favourite-info-content/:id",
  authenticate,
  favouriteAllInfoContent
);
module.exports = router;
