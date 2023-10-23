const Contribute = require("../models/Contribute");
const TrashData = require("../models/TrashData");
const ContributeContent = require("../models/ContributeContent");
const User = require("../models/user");
const SubjectArea = require("../models/SubjectArea");
var mongoose = require("mongoose");

//show new contribution data
exports.getallcontributeListData = async (req, res) => {
  // const _id = req.ID;
  const userId = req.ID;
  try {
    //finding data who has same user id

    const result1 = await Contribute.find({
      contributeRequestStatus: false,
      //authorId: { $ne: userId },
    }).exec();

    const result2 = await SubjectArea.find({
      contributeRequestStatus: false,
      //authorId: { $ne: userId },
    }).exec();

    let result = result1.concat(result2);

    console.log("gg", result);
    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ error });
  }
};

//delect id by update the role
exports.contributedDataDelete = async (req, res) => {
  try {
    const { id } = req.body;
    await ContributeContent.deleteMany({ contributeId: id });

    await Contribute.findOneAndDelete({ _id: id });
    await SubjectArea.findOneAndDelete({ _id: id });

    res.json({ message: "successfully deleted" });
  } catch (error) {
    res.json({ message: error });
  }
};

//update contribute status
exports.updateContributeRequest = async (req, res) => {
  try {
    const { id } = req.body;

    await Contribute.findByIdAndUpdate(id, {
      $set: { contributeRequestStatus: true },
    });
    await SubjectArea.findByIdAndUpdate(id, {
      $set: { contributeRequestStatus: true },
    });
    res.json({ message: "successfully updated" });
  } catch (error) {
    res.json({ message: error });
  }
};

//get all laws

exports.getallcontributeLawsByAdmin = async (req, res) => {
  // const _id = req.ID;
  const userId = req.ID;
  try {
    //finding data who has same user id
    const resultUser = await User.findById(userId).exec();
    if (resultUser.role === "super-admin") {
      const result = await Contribute.find({
        contributetype: "Laws",
        authorId: userId,
        contributeTrashStatus: false,
      }).exec();
      res.status(200).json({ result });
    } else {
      res.status(404).json({ error });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};
//all laws by contributor
exports.getallcontributeLawsByContributor = async (req, res) => {
  // const _id = req.ID;
  const userId = req.ID;
  try {
    //finding data who has same user id
    const resultUser = await User.findById(userId).exec();
    if (resultUser.role === "super-admin") {
      const result = await Contribute.find({
        contributetype: "Laws",
        authorId: { $ne: userId },
        contributeRequestStatus: true,
        contributeTrashStatus: false,
      }).exec();
      res.status(200).json({ result });
    } else {
      res.status(404).json({ error });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

// ***********  get all subject area by admin *************
exports.getallSubjectAreaByAdmin = async (req, res) => {
  const userId = req.ID;
  try {
    const resultUser = await User.findById(userId).exec();
    if (resultUser.role === "super-admin") {
      const result = await SubjectArea.find({
        authorId: userId,
        contributeRequestStatus: true,
        contributeTrashStatus: false,
      }).exec();
      res.status(200).json({ result });
    } else {
      res.status(404).json({ error });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};
//**********  get all subject area by admin end *************

// ***********  get all subject area contributor*************
exports.getallSubjectAreaByContributor = async (req, res) => {
  const userId = req.ID;
  try {
    //finding data who has same user id
    const resultUser = await User.findById(userId).exec();
    if (resultUser.role === "super-admin") {
      const result = await SubjectArea.find({
        authorId: { $ne: userId },
        contributeRequestStatus: true,
        contributeTrashStatus: false,
      }).exec();
      res.status(200).json({ result });
    } else {
      res.status(404).json({ error });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};
//**********  get all subject area by contributor *************

// xxxxxxxxxxx get all insight data by admin Xxxxxxxxxxx
exports.getallcontributeInsightByAdmin = async (req, res) => {
  // const _id = req.ID;
  const userId = req.ID;
  try {
    //finding data who has same user id
    const resultUser = await User.findById(userId).exec();
    if (resultUser.role === "super-admin") {
      const result = await Contribute.find({
        contributetype: "Insight",
        authorId: userId,
        contributeTrashStatus: false,
      }).exec();
      res.status(200).json({ result });
    } else {
      res.status(404).json({ error });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};
//xxxxxxxxxxx end get all insight data by aadmin xxxxxxxxx

// xxxxxxxxxx start get all contrute data by all contributor xxxxxxxxx
exports.getallcontributeInsightByContributor = async (req, res) => {
  // const _id = req.ID;
  const userId = req.ID;
  try {
    //finding data who has same user id
    const resultUser = await User.findById(userId).exec();
    if (resultUser.role === "super-admin") {
      const result = await Contribute.find({
        contributetype: "Insight",
        authorId: { $ne: userId },
        contributeRequestStatus: true,
        contributeTrashStatus: false,
      }).exec();
      res.status(200).json({ result });
    } else {
      res.status(404).json({ error });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};
// xxxxxxxxxxx  end get all data by contributor xxxxxxxxxxxxx

//&&&&&&&&&&&&&&   get all case law by admin &&&&&&&&&&&&&&&&&
exports.getallcontributeCaseLawByAdmin = async (req, res) => {
  // const _id = req.ID;
  const userId = req.ID;
  try {
    //finding data who has same user id
    const resultUser = await User.findById(userId).exec();
    if (resultUser.role === "super-admin") {
      const result = await Contribute.find({
        contributetype: "caselaw",
        authorId: userId,
        contributeTrashStatus: false,
      }).exec();
      res.status(200).json({ result });
    } else {
      res.status(404).json({ error });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};
//&&&&&&&&&&& end case laws by admin &&&&&&&&&&&&&&&&&&&&&&&&

//&&&&&&&&&&& end case laws by contributor &&&&&&&&&&&&&&&&&&&&&&&&
exports.getallcontributeCaseLawByContributor = async (req, res) => {
  // const _id = req.ID;
  const userId = req.ID;
  try {
    //finding data who has same user id
    const resultUser = await User.findById(userId).exec();
    if (resultUser.role === "super-admin") {
      const result = await Contribute.find({
        contributetype: "caselaw",
        authorId: { $ne: userId },
        contributeRequestStatus: true,
        contributeTrashStatus: false,
      }).exec();
      res.status(200).json({ result });
    } else {
      res.status(404).json({ error });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

//&&&&&&&&&&& end case laws by contributor &&&&&&&&&&&&&&&&&&&&&&&&
// ############ all journal article by admin ###############
exports.getallcontributeJournalArticleByAdmin = async (req, res) => {
  // const _id = req.ID;
  const userId = req.ID;
  try {
    //finding data who has same user id
    const resultUser = await User.findById(userId).exec();
    if (resultUser.role === "super-admin") {
      const result = await Contribute.find({
        contributetype: "Journal Article",
        contributeTrashStatus: false,
        authorId: userId,
      }).exec();
      res.status(200).json({ result });
    } else {
      res.status(404).json({ error });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};
//  ########### end all journal article by admin ############

//############## get contributor all journa article ################
exports.getallcontributeJournalArticleByContributor = async (req, res) => {
  // const _id = req.ID;
  const userId = req.ID;
  try {
    //finding data who has same user id
    const resultUser = await User.findById(userId).exec();
    if (resultUser.role === "super-admin") {
      const result = await Contribute.find({
        contributetype: "Journal Article",
        authorId: { $ne: userId },
        contributeRequestStatus: true,
        contributeTrashStatus: false,
      }).exec();
      res.status(200).json({ result });
    } else {
      res.status(404).json({ error });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};
//################ end journa article ###################

// $$$$$$$$ book list for admin $$$$$$$$$
exports.getallcontributeBooksByAdmin = async (req, res) => {
  // const _id = req.ID;
  const userId = req.ID;
  try {
    //finding data who has same user id
    const resultUser = await User.findById(userId).exec();
    if (resultUser.role === "super-admin") {
      const result = await Contribute.find({
        contributetype: "Book",
        authorId: userId,
        contributeRequestStatus: true,
        contributeTrashStatus: false,
      }).exec();
      res.status(200).json({ result });
    } else {
      res.status(404).json({ error });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};
// $$$$$$$ end book list for admin $$$$$$$
// $$$$$$$$ contributor book  $$$$$$$$$$$$$$$$$
exports.getallcontributeBookByContributor = async (req, res) => {
  // const _id = req.ID;
  const userId = req.ID;
  try {
    //finding data who has same user id
    const resultUser = await User.findById(userId).exec();
    if (resultUser.role === "super-admin") {
      const result = await Contribute.find({
        contributetype: "Book",
        authorId: { $ne: userId },
        contributeRequestStatus: true,
        contributeTrashStatus: false,
      }).exec();
      res.status(200).json({ result });
    } else {
      res.status(404).json({ error });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};
//$$$$$$$$$ contributor book $$$$$$$$$$
//update status [aid fr free
exports.updateStatusPaidOrFree = async (req, res) => {
  try {
    const { id, status } = req.body;

    await Contribute.findByIdAndUpdate(id, {
      $set: { contributePaidFreeStatus: status },
    });
    res.json({ message: "successfully updated" });
  } catch (error) {
    res.json({ message: error });
  }
};
//update status [aid fr free
exports.updateStatusSubAreaSinglePaidOrFree = async (req, res) => {
  try {
    const { id, status } = req.body;

    await SubjectArea.findByIdAndUpdate(id, {
      $set: { contributePaidFreeStatus: status },
    });
    res.json({ message: "successfully updated" });
  } catch (error) {
    res.json({ message: error });
  }
};
//apply all paid free status updates
exports.updateMultiStatusPaidOrFree = async (req, res) => {
  try {
    const { clickedArticleId, status } = req.body;

    for (let index = 0; index < clickedArticleId.length; index++) {
      const element = clickedArticleId[index];

      await Contribute.updateMany(
        { _id: { $in: [element] } },
        { $set: { contributePaidFreeStatus: status } },
        { multi: true }
      );
    }

    res.json({ message: "successfully updated" });
  } catch (error) {
    res.json({ message: error });
  }
};
//multi data changes for subject area

exports.updatesubAreaMultiStatus = async (req, res) => {
  try {
    const { clickedArticleId, status } = req.body;

    for (let index = 0; index < clickedArticleId.length; index++) {
      const element = clickedArticleId[index];

      await SubjectArea.updateMany(
        { _id: { $in: [element] } },
        { $set: { contributePaidFreeStatus: status } },
        { multi: true }
      );
    }

    res.json({ message: "successfully updated" });
  } catch (error) {
    res.json({ message: error });
  }
};

//work for trash system api
//**  single data send to trash**
exports.sendSingleDataToTrash = async (req, res) => {
  try {
    const userId = req.ID;
    const { id, status } = req.body;

    await Contribute.findByIdAndUpdate(id, {
      $set: { contributeTrashStatus: status },
    });
    let trashes = new TrashData({
      userIdWhoSendInTrash: userId,
      contributeId: id,
    });
    // save model to databaseb
    trashes.save(function (err, data) {
      if (err) res.status(404).json({ err });
      else {
        res.status(200).json({ data: data._id });
      }
    });
  } catch (error) {
    res.json({ message: error });
  }
};

//**** update multiple data send to trash ****
exports.sendMultipleDataStatusTrash = async (req, res) => {
  try {
    const { clickedArticleId, status } = req.body;

    const userId = req.ID;
    await Contribute.updateMany(
      { _id: { $in: clickedArticleId } },
      { $set: { contributeTrashStatus: status } },
      { multi: true }
    );

    for (let index = 0; index < clickedArticleId.length; index++) {
      const element = clickedArticleId[index];

      let trashes = new TrashData({
        userIdWhoSendInTrash: userId,
        contributeId: element,
      });
      // save model to databaseb
      try {
        await trashes.save();
      } catch (error) {
        res.json({ message: error });
      }
    }
    res.status(200).json({ data: "success" });
  } catch (error) {
    res.json({ message: error });
  }
};
//**** end update multiple data send to trash ****

//subject area send to trash
exports.sendSingleDataSubjectAreaToTrash = async (req, res) => {
  try {
    const userId = req.ID;
    const { id, status } = req.body;

    await SubjectArea.findByIdAndUpdate(id, {
      $set: { contributeTrashStatus: status },
    });
    let trashes = new TrashData({
      userIdWhoSendInTrash: userId,
      contributeId: id,
    });
    // save model to databaseb
    trashes.save(function (err, data) {
      if (err) res.status(404).json({ err });
      else {
        res.status(200).json({ data: data._id });
      }
    });
  } catch (error) {
    res.json({ message: error });
  }
};

//**** update subject area multiple data send to trash ****
exports.sendMultipleSubjectAreaDataStatusTrash = async (req, res) => {
  try {
    const { clickedArticleId, status } = req.body;

    const userId = req.ID;
    await SubjectArea.updateMany(
      { _id: { $in: clickedArticleId } },
      { $set: { contributeTrashStatus: status } },
      { multi: true }
    );
    for (let index = 0; index < clickedArticleId.length; index++) {
      const element = clickedArticleId[index];
      let trashes = new TrashData({
        userIdWhoSendInTrash: userId,
        contributeId: element,
      });
      // save model to databaseb
      await trashes.save();
    }
    res.status(200).json({ data: "success" });
  } catch (error) {
    res.json({ message: error });
  }
};
//**** end update Subject ARea multiple data send to trash ****
