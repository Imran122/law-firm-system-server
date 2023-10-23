const mongoose = require("mongoose");

// user schema
const contributeScheama = new mongoose.Schema(
  {
    contributeRequestStatus: {
      type: Boolean,
      default: false,
    },
    contributeTrashStatus: {
      type: Boolean,
      default: false,
    },
    contributePaidFreeStatus: {
      type: String,
      trim: true,
      default: "paid",
    },
    title: {
      type: String,
      trim: true,
      max: 32,
    },
    countryNameList: [
      {
        type: String,
        trim: true,
      },
    ],
    contributetype: {
      type: String,
      trim: true,
      max: 32,
    },
    bookCategory: {
      type: String,
      trim: true,
      max: 32,
    },
    regionNameList: [
      {
        type: String,
        trim: true,
      },
    ],
    authorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    authorName: {
      type: String,
      trim: true,
      max: 32,
    },
    publisherName: {
      type: String,
      trim: true,
      max: 32,
    },
    caseBookOverview: {
      type: String,
      max: 32,
    },
    caseSummary: {
      type: String,
      max: 32,
    },
    caseHeadNotes: {
      type: String,
      max: 32,
    },
    caseOpinions: {
      type: String,
      max: 32,
    },
    caseClass: {
      type: String,
      max: 32,
    },
    termsTagName: {
      type: String,
      max: 32,
    },
    judgeName: {
      type: String,
      max: 32,
    },
    counselName: {
      type: String,
      max: 32,
    },

    judgmentDate: {
      type: Date,
    },
    caseNumber: {
      type: String,
      max: 32,
    },
    caseParties: {
      type: String,
      max: 32,
    },
    caseCitation: {
      type: String,
    },
    caseAction: {
      type: String,
    },
    journalArticleCategorey: {
      type: String,
      trim: true,
    },
    subjectAreaForArticle: {
      type: String,
    },
    journalVolumeNumber: {
      type: String,
      trim: true,
    },
    journalIssue: {
      type: String,
      trim: true,
    },
    journalkeyword: {
      type: String,
      trim: true,
    },
    journalYearForCitation: {
      type: Number,
      trim: true,
    },
    journalOverview: {
      type: String,
      trim: true,
    },
    lawsCategorey: {
      type: String,
      trim: true,
    },
    lawsActNumber: {
      type: String,
      trim: true,
    },
    lawsCommencementDate: {
      type: Date,
    },
    reviewDate: {
      type: Date,
    },
    lawsAssentDate: {
      type: Date,
    },
    lawsOverview: {
      type: String,
      trim: true,
    },
    insightCategorey: {
      type: String,
      trim: true,
    },
    insightOverview: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Contribute", contributeScheama);
