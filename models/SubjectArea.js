const mongoose = require("mongoose");

// user schema
const subjectAreaScheama = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    authorName: {
      type: String,
      trim: true,
      max: 32,
    },
    contributetype: {
      type: String,
      trim: true,
      default: "Subject Area",
    },
    contributeTrashStatus: {
      type: Boolean,
      default: false,
    },
    contributeRequestStatus: {
      type: Boolean,
      default: false,
    },
    contributePaidFreeStatus: {
      type: String,
      trim: true,
      default: "paid",
    },
    disputeResolutionList: [
      {
        disputeTitle: {
          type: String,
          trim: true,
        },

        disputeText: {
          type: String,
          trim: true,
        },
      },
    ],
    featuredList: [
      {
        featuredTitle: {
          type: String,
          trim: true,
        },

        featuredText: {
          type: String,
          trim: true,
        },
      },
    ],
    countryNameList: [
      {
        type: String,
        trim: true,
      },
    ],
    regionNameList: [
      {
        type: String,
        trim: true,
      },
    ],
    subsidaryPrinciple: {
      type: String,
      trim: true,
    },
    practiceArea: {
      type: String,
      trim: true,
    },
    sectors: {
      type: String,
      trim: true,
    },
    resources: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("subjectArea", subjectAreaScheama);
