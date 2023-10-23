const express = require("express");
const router = express.Router();
const {
  contributedDataDelete,
  getallcontributeListData,
  updateContributeRequest,
  getallcontributeLawsByAdmin,
  getallcontributeLawsByContributor,
  updateStatusPaidOrFree,
  getallSubjectAreaByAdmin,
  getallSubjectAreaByContributor,
  getallcontributeInsightByAdmin,
  getallcontributeInsightByContributor,
  getallcontributeCaseLawByAdmin,
  getallcontributeCaseLawByContributor,
  getallcontributeJournalArticleByAdmin,
  getallcontributeJournalArticleByContributor,
  getallcontributeBooksByAdmin,
  getallcontributeBookByContributor,
  updateMultiStatusPaidOrFree,
  updatesubAreaMultiStatus,
  updateStatusSubAreaSinglePaidOrFree,
  sendSingleDataToTrash,
  sendSingleDataSubjectAreaToTrash,
  sendMultipleDataStatusTrash,
  sendMultipleSubjectAreaDataStatusTrash,
} = require("../controllers/superAdmin");

// import validators

const { authenticate } = require("../middleware/authurize");

router.delete("/contributed-data-delete", authenticate, contributedDataDelete);
router.get("/get-contribute-list-data", authenticate, getallcontributeListData);
router.put("/update-contribute-request", authenticate, updateContributeRequest);
//a admin route
router.get(
  "/get-contribute-laws-byadmin",
  authenticate,
  getallcontributeLawsByAdmin
);
router.get(
  "/get-contribute-subject-area-byadmin",
  authenticate,
  getallSubjectAreaByAdmin
);
router.get(
  "/get-contribute-insight-byadmin",
  authenticate,
  getallcontributeInsightByAdmin
);
router.get(
  "/get-contribute-case-law-byadmin",
  authenticate,
  getallcontributeCaseLawByAdmin
);
router.get(
  "/get-contribute-journal-article-byadmin",
  authenticate,
  getallcontributeJournalArticleByAdmin
);
router.get(
  "/get-contribute-book-byadmin",
  authenticate,
  getallcontributeBooksByAdmin
);
//contributor route
router.get(
  "/get-contribute-insight-by-contributor",
  authenticate,
  getallcontributeInsightByContributor
);
router.get(
  "/get-contribute-laws-by-contributor",
  authenticate,
  getallcontributeLawsByContributor
);

router.get(
  "/get-subject-area-by-contributor",
  authenticate,
  getallSubjectAreaByContributor
);
router.get(
  "/get-case-law-by-contributor",
  authenticate,
  getallcontributeCaseLawByContributor
);
router.get(
  "/get-journal-article-by-contributor",
  authenticate,
  getallcontributeJournalArticleByContributor
);
router.get(
  "/get-book-by-contributor",
  authenticate,
  getallcontributeBookByContributor
);
router.put("/update-status-paid-free", authenticate, updateStatusPaidOrFree);
router.put("/update-multi-status", authenticate, updateMultiStatusPaidOrFree);
router.put(
  "/update-sub-area-multi-status",
  authenticate,
  updatesubAreaMultiStatus
);
router.put(
  "/update-sub-area-single-status",
  authenticate,
  updateStatusSubAreaSinglePaidOrFree
);
router.put("/send-single-datato-trash", authenticate, sendSingleDataToTrash);
router.put(
  "/send-single-subject-datato-trash",
  authenticate,
  sendSingleDataSubjectAreaToTrash
);
router.put(
  "/send-multiple-datato-trash",
  authenticate,
  sendMultipleDataStatusTrash
);
router.put(
  "/send-subjectarea-multiple-datato-trash",
  authenticate,
  sendMultipleSubjectAreaDataStatusTrash
);
module.exports = router;
