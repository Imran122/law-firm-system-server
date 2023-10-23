const mongoose = require("mongoose");

// user schema
const trashDataScheama = new mongoose.Schema(
  {
    contributeTrashStatus: {
      type: Boolean,
      default: true,
    },
    userIdWhoSendInTrash: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    contributeId: {
      type: mongoose.Types.ObjectId,
      ref: "Contribute",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("TrashData", trashDataScheama);
