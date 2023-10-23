const Contribute = require("../models/Contribute");
const TrashData = require("../models/TrashData");
const ContributeContent = require("../models/ContributeContent");
const User = require("../models/user");
const SubjectArea = require("../models/SubjectArea");
var mongoose = require("mongoose");

exports.getTrashDataList = async (req, res) => {
  // const _id = req.ID;
  try {
    const userId = new mongoose.Types.ObjectId(req.ID);

    const list = await TrashData.aggregate([
      { $match: { userIdWhoSendInTrash: userId } },
      {
        $lookup: {
          from: "subjectareas", // collection to join
          localField: "contributeId", //this field as refereence
          foreignField: "_id",
          as: "listOfSUbjectAreaTrashData", // output array field
        },
      },
      {
        $lookup: {
          from: "contributes", // collection to join
          localField: "contributeId", //this field as refereence
          foreignField: "_id",
          as: "listContributedOfTrashData", // output array field
        },
      },
    ]).exec();

    const trashItem = list.map((item) => {
      let trashList = [];
      if (item.listContributedOfTrashData[0]) {
        trashList.push({
          trashId: item._id,
          contributeData: item.listContributedOfTrashData[0],
        });
      } else {
        trashList.push({
          trashId: item._id,
          contributeData: item.listOfSUbjectAreaTrashData[0],
        });
      }

      return trashList;
    });

    res.json({ trashItem });
  } catch (error) {
    res.status(404).json({ error });
  }
};

//trash permanent delete system

exports.trashSIngleDataDelete = async (req, res) => {
  try {
    const { id, trashDataId } = req.body;
    await ContributeContent.deleteMany({ contributeId: id });

    await Contribute.findOneAndDelete({ _id: id });
    await SubjectArea.findOneAndDelete({ _id: id });
    await TrashData.findOneAndDelete({ _id: trashDataId });

    res.json({ message: "successfully deleted" });
  } catch (error) {
    res.json({ message: error });
  }
};

exports.trashMultipleDataDelete = async (req, res) => {
  try {
    const { contributIdList, clickedArticleId } = req.body;
    //console.log("1st con", contributIdList);
    //console.log("2nd con", clickedArticleId);
    await ContributeContent.deleteMany(
      { contributeId: { $in: contributIdList } },

      { multi: true }
    );
    await Contribute.deleteMany(
      { _id: { $in: contributIdList } },

      { multi: true }
    );
    await SubjectArea.deleteMany(
      { _id: { $in: contributIdList } },

      { multi: true }
    );

    await TrashData.deleteMany(
      { _id: { $in: clickedArticleId } },

      { multi: true }
    );

    res.json({ message: "successfully deleted" });
  } catch (error) {
    res.json({ message: error });
  }
};
//restore trash data into data list
exports.restoresingleTrashData = async (req, res) => {
  const { id, trashDataId, status, contributetype } = req.body;
  try {
    if (contributetype !== "Subject Area") {
      await Contribute.findByIdAndUpdate(id, {
        $set: { contributeTrashStatus: status },
      });
    } else {
      await SubjectArea.findByIdAndUpdate(id, {
        $set: { contributeTrashStatus: status },
      });
    }

    await TrashData.findOneAndDelete({ _id: trashDataId });
    res.json({ message: "successfully restored" });
  } catch (error) {
    res.json({ message: error });
  }
};

//multiple data send to trash  contributetype
exports.restoreMultipleTrashData = async (req, res) => {
  const { clickedArticleId, contributIdList, status } = req.body;
  try {
    await Contribute.updateMany(
      { _id: { $in: contributIdList } },
      { $set: { contributeTrashStatus: status } },
      { multi: true }
    );

    await SubjectArea.updateMany(
      { _id: { $in: contributIdList } },
      { $set: { contributeTrashStatus: status } },
      { multi: true }
    );

    /*    for (let index = 0; index < contributIdList.length; index++) {
      const element = contributIdList[index];
      await Contribute.findByIdAndUpdate(element, {
        $set: { contributeTrashStatus: status },
      });
      await SubjectArea.findByIdAndUpdate(element, {
        $set: { contributeTrashStatus: status },
      });
    } */
    await TrashData.deleteMany(
      { _id: { $in: clickedArticleId } },

      { multi: true }
    );
    /*  for (let index = 0; index < clickedArticleId.length; index++) {
      const element = clickedArticleId[index];
      await TrashData.findOneAndDelete({ _id: element });
    } */
    res.json({ message: "successfully restored" });
  } catch (error) {
    res.json({ message: error });
  }
};
