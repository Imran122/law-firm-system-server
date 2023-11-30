const mongoose = require("mongoose");
const crypto = require("crypto");
// user schema
const userScheama = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      max: 32,
    },
    lastname: {
      type: String,
      trim: true,
      max: 32,
    },
    role: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    purchasePackageId: {
      type: mongoose.Types.ObjectId,
      ref: "PurchasePackageData",
    },
    agentId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    contact_number: {
      type: String,
    },
    is_agent: {
      type: Boolean,
      default:false
    },
    address: {
      type: String,
    },
    hashed_password: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    loginType: {
      type: String,
    },
    salt: String,
  },
  { timestamps: true }
);

// virtual
userScheama
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userScheama.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password; // true false
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", userScheama);
