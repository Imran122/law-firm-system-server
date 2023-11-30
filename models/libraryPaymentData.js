const mongoose = require("mongoose");

// rent car upload model schema

const libraryPaymentDataScheama = new mongoose.Schema(
  {
    userIdWhoPaid: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    packageId: {
      type: mongoose.Types.ObjectId,
      ref: "packageData",
    },
    purchasePackageId: {
      type: mongoose.Types.ObjectId,
      ref: "PurchasePackageData",
    },
    paymentStatus: {
      type: String,
      default: "paid",
      trim: true,
    },
    paidAmount: {
      type: Number,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "libraryPaymentData",
  libraryPaymentDataScheama
);
