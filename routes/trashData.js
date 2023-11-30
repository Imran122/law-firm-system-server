const express = require("express");
const router = express.Router();
const {
  getTrashDataList,
  trashSIngleDataDelete,
  trashMultipleDataDelete,
  restoresingleTrashData,
  restoreMultipleTrashData,
} = require("../controllers/trashData");

// import validators

const { authenticate } = require("../middleware/authurize");

router.get("/get-trash-data-list", authenticate, getTrashDataList);
router.delete("/single-trash-data-delete", authenticate, trashSIngleDataDelete);
router.delete(
  "/multiple-trash-data-delete",
  authenticate,
  trashMultipleDataDelete
);
router.put("/restore-single-trash-data", authenticate, restoresingleTrashData);
router.put(
  "/restore-multiple-trash-data",
  authenticate,
  restoreMultipleTrashData
);
module.exports = router;
