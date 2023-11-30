const mongoose = require("mongoose");

// user schema
const contributecontentScheama = new mongoose.Schema(
  {
    content: {
      type: String,
      max: 255,
    },
    contentTitle: {
      type: String,
      trim: true,
      required: true,
      max: 255,
    },
    contributeId: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    parentcontributecontentId: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("ContributeContent", contributecontentScheama);