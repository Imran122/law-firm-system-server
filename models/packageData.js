const mongoose = require("mongoose");

// rent car upload model schema

const packageDataScheama = new mongoose.Schema(
  {
    packageName: {
      type: String,
      trim: true,
    },
    /* custom pachage */
    packageType: {
      type: String,
      trim: true,
    },
    institutionName: {
      type: String,
      trim: true,
    },
    locationOfTheInstitute: {
      type: String,
      trim: true,
    },
    postionOfThePerson: {
      type: String,
      trim: true,
    },
    emailOfThePerson: {
      type: String,
      trim: true,
    },
    phoneOfThePerson: {
      type: String,
      trim: true,
    },
    contactDurationForCustomPackage: {
      type: String,
      trim: true,
    },
    noteForCustomPackage: {
      type: String,
      trim: true,
    },
    contractStartDate: {
      type: Date,
      trim: true,
    },
    contractEndDate: {
      type: Date,
      trim: true,
    },
    /* custom pachage */
    packagesPrice: {
      type: String,
      trim: true,
    },
    discountPrice: {
      type: Number,
      trim: true,
    },
    vatAmount: {
      type: Number,
      trim: true,
    },
    cuponCode: {
      type: String,
      trim: true,
    },
    cuponDiscountPrice: {
      type: Number,
      trim: true,
    },
    cuponExpireDate: {
      type: Date,
      trim: true,
    },
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
    featuresOffered: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("packageData", packageDataScheama);
