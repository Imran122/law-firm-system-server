const express = require("express");
const router = express.Router();

// import controller
const {
  subjectAreaDataPost,
  getallSubjectData,
  getSubjectAreaDetails,
  subjectAreaDataUpdate,
} = require("../controllers/SubjectArea");

// import validators

const { authenticate } = require("../middleware/authurize");

router.post("/subject-area-create", authenticate, subjectAreaDataPost);
router.put("/subject-area-update", authenticate, subjectAreaDataUpdate);
router.get("/subject-list-data", authenticate, getallSubjectData);
router.get("/subject-details-data", authenticate, getSubjectAreaDetails);
module.exports = router;
