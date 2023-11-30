const express = require("express");
const router = express.Router();

// import controller
const {
  bookcontributecreate,
  caselawcontributecreate,
  getallcontributebook,
  updateHeadNotes,
  getHeadNotesForEdit,
  getContributeCaseLawList,
  getContributeJournalArticleList,
  getallcontributeLaws,
  getallcontributeInsight,
  getContributeDetails,
  bookcontributeupdate,
  caselawcontributeupdate
} = require("../controllers/contribute");

// import validators
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");

const { authenticate } = require("../middleware/authurize");

const { runValidation } = require("../validators");

router.post("/book-contribute-create", authenticate, bookcontributecreate);
router.put("/book-contribute-update", authenticate, bookcontributeupdate);
router.post(
  "/caselaw-contribute-create",
  authenticate,
  caselawcontributecreate
);
router.put(
  "/caselaw-contribute-update",
  authenticate,
  caselawcontributeupdate
);
router.get("/all-contribute-book", authenticate, getallcontributebook);

router.get("/get-contribute-laws", authenticate, getallcontributeLaws);
router.get(
  "/get-contribute-caselase-list",
  authenticate,
  getContributeCaseLawList
);
router.get(
  "/get-journal-article-list",
  authenticate,
  getContributeJournalArticleList
);
router.get("/get-insight-list", authenticate, getallcontributeInsight);
router.get("/get-contribute-details", authenticate, getContributeDetails);

router.get("/headnotes-edit-data", authenticate, getHeadNotesForEdit);
router.put("/update-head-notes", authenticate, updateHeadNotes);
module.exports = router;
