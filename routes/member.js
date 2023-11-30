const express = require("express");

const router = express.Router();
// import controller

const {
  favouriteAllBookInfor,
  favouriteDeleteDasboard,
  favouriteAllContentInfo,
  getcontributeBookByUser,
  getcontributeArticleByUser,
  getcontributeInsightByUser,
  getcontributeCaseLawByUser,
  getcontributeLawsByUser,
  getcontributeSubjectAreaByUser,
} = require("../controllers/member");
const { authenticate } = require("../middleware/authurize");
router.get(
  "/favourite-all-content-info",
  authenticate,
  favouriteAllContentInfo
);
router.get("/favourite-all-book-info", authenticate, favouriteAllBookInfor);
router.get(
  "/get-contribute-book-by-user",
  authenticate,
  getcontributeBookByUser
);
router.get(
  "/get-contribute-article-by-user",
  authenticate,
  getcontributeArticleByUser
);
router.get(
  "/get-contribute-insight-by-user",
  authenticate,
  getcontributeInsightByUser
);
router.get(
  "/get-contribute-case-law-by-user",
  authenticate,
  getcontributeCaseLawByUser
);
router.get(
  "/get-contribute-laws-by-user",
  authenticate,
  getcontributeLawsByUser
);
router.get(
  "/get-contribute-subject-area-by-user",
  authenticate,
  getcontributeSubjectAreaByUser
);
router.delete(
  "/favourite-delete-dashboard",
  authenticate,
  favouriteDeleteDasboard
);
module.exports = router;
