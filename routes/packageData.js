const express = require("express");
const router = express.Router();

// import controller
const { authenticate } = require("../middleware/authurize");
const {
  createPackages,
  packageListData,
  packageDetailsInfo,
  updatePackage,
} = require("../controllers/packageData");

router.post("/create-packages", authenticate, createPackages);
router.get("/package-list-data", authenticate, packageListData);

router.get("/package-details-info/:id", authenticate, packageDetailsInfo);
router.put("/update-package", authenticate, updatePackage);

module.exports = router;
