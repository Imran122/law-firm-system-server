const mongoose = require("mongoose");

// rent car upload model schema

const PurchasePackageDataScheama = new mongoose.Schema(
    {
        userIdWhoPurchase: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        packageId: {
            type: mongoose.Types.ObjectId,
            ref: "packageData",
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
        packageName: {
            type: String,
            trim: true,
        },
        packagesPrice: {
            type: String,
            trim: true,
        },
        featuresOffered: [
            {
                type: String,
                trim: true,
            },
        ],
        packageChargeTimeName: {
            type: String,
            trim: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("PurchasePackageData", PurchasePackageDataScheama);
