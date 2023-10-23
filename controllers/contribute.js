const Contribute = require("../models/Contribute");
const User = require("../models/user");
var mongoose = require("mongoose");
exports.bookcontributecreate = async (req, res) => {
  const {
    countryNameList,
    contributetype,
    title,
    bookCategory,
    regionNameList,
    publisherName,
    journalArticleCategorey,
    subjectAreaForArticle,
    journalVolumeNumber,
    journalIssue,
    journalkeyword,
    journalYearForCitation,
    journalOverview,
    lawsCategorey,
    lawsActNumber,
    lawsCommencementDate,
    lawsAssentDate,
    lawsOverview,
    insightCategorey,
    insightOverview,
    reviewDate,
  } = req.body;
  const userId = req.ID;

  //saving user info into db
  const result = await User.findById(userId).exec();
  let contribute = new Contribute({
    countryNameList,
    contributetype,
    title,
    bookCategory,
    regionNameList,
    publisherName,
    journalArticleCategorey,
    subjectAreaForArticle,
    journalVolumeNumber,
    journalIssue,
    journalkeyword,
    journalYearForCitation,
    journalOverview,
    lawsCategorey,
    lawsActNumber,
    lawsCommencementDate,
    lawsAssentDate,
    lawsOverview,
    insightCategorey,
    insightOverview,
    reviewDate,
    authorId: result._id,
    authorName: result.firstname,
  });

  // save model to databaseb
  contribute.save(function (err, data) {
    if (err) res.status(404).json({ err });
    else {
      res.status(200).json({ contributeid: data._id, title: data.title });
    }
  });
};
exports.bookcontributeupdate = async (req, res) => {
  const {
    countryNameList,
    contributetype,
    title,
    bookCategory,
    regionNameList,
    publisherName,
    journalArticleCategorey,
    subjectAreaForArticle,
    journalVolumeNumber,
    journalIssue,
    journalkeyword,
    journalYearForCitation,
    journalOverview,
    lawsCategorey,
    lawsActNumber,
    lawsCommencementDate,
    lawsAssentDate,
    lawsOverview,
    insightCategorey,
    insightOverview,
    reviewDate,
    _id,
  } = req.body;
  const userId = req.ID;

  //saving user info into db
  const result = await User.findById(userId).exec();
  let contribute = {
    countryNameList,
    contributetype,
    title,
    bookCategory,
    regionNameList,
    publisherName,
    journalArticleCategorey,
    subjectAreaForArticle,
    journalVolumeNumber,
    journalIssue,
    journalkeyword,
    journalYearForCitation,
    journalOverview,
    lawsCategorey,
    lawsActNumber,
    lawsCommencementDate,
    lawsAssentDate,
    lawsOverview,
    insightCategorey,
    insightOverview,
    reviewDate,
    authorId: result._id,
    authorName: result.firstname,
  };

  // save model to databaseb
  // contribute.save(function (err, data) {
  //   if (err) res.status(404).json({ err });
  //   else {
  //     res.status(200).json({ contributeid: data._id, title: data.title });
  //   }
  // });

  Contribute.findOneAndUpdate({ _id }, contribute, null, function (err, docs) {
    if (err) res.status(404).json({ err });
    else {
      res.status(200).json({ contributeid: _id, title: contribute.title });
    }
  });
};
exports.caselawcontributecreate = async (req, res) => {
  const {
    caseBookOverview,
    countryNameList,
    contributetype,
    caseClass,
    title,
    judgmentDate,
    regionNameList,
    termsTagName,
    judgeName,
    counselName,
    caseSummary,
    caseHeadNotes,
    caseOpinions,
    caseAction,
    caseCitation,
    caseParties,
    caseNumber,
  } = req.body;
  const userId = req.ID;

  //saving user info into db
  const result = await User.findById(userId).exec();
  let contribute = new Contribute({
    authorId: result._id,
    authorName: result.firstname,
    caseBookOverview,
    countryNameList,
    contributetype,
    caseClass,
    title,
    judgmentDate,
    regionNameList,
    termsTagName,
    judgeName,
    counselName,
    caseSummary,
    caseHeadNotes,
    caseOpinions,
    caseAction,
    caseCitation,
    caseParties,
    caseNumber,
  });

  // save model to database
  contribute.save(function (err, data) {
    if (err) res.status(404).json({ err });
    else {
      res.status(200).json({ contributeid: data._id, title: data.title });
    }
  });
};
exports.caselawcontributeupdate = async (req, res) => {
  const {
    caseBookOverview,
    countryNameList,
    contributetype,
    caseClass,
    title,
    judgmentDate,
    regionNameList,
    termsTagName,
    judgeName,
    counselName,
    caseSummary,
    caseHeadNotes,
    caseOpinions,
    caseAction,
    caseCitation,
    caseParties,
    caseNumber,
    _id,
  } = req.body;
  const userId = req.ID;

  //saving user info into db
  const result = await User.findById(userId).exec();
  let contribute = {
    authorId: result._id,
    authorName: result.firstname,
    caseBookOverview,
    countryNameList,
    contributetype,
    caseClass,
    title,
    judgmentDate,
    regionNameList,
    termsTagName,
    judgeName,
    counselName,
    caseSummary,
    caseHeadNotes,
    caseOpinions,
    caseAction,
    caseCitation,
    caseParties,
    caseNumber,
  };
  Contribute.findOneAndUpdate({ _id }, contribute, null, function (err, docs) {
    if (err) res.status(404).json({ err });
    else {
      res.status(200).json({ contributeid: _id, title: contribute.title });
    }
  });
};
exports.getallcontributebook = async (req, res) => {
  const _id = mongoose.Types.ObjectId(req.ID);

  try {
    //finding data who has same user id

    const UserRes = await User.aggregate([
      {
        $match: {
          _id: _id,
        },
      },
      {
        $lookup: {
          from: "purchasepackagedatas",
          localField: "purchasePackageId",
          foreignField: "_id",
          as: "PurchasePackageData",
        },
      },
    ]);

    let countryNameListFromPackage = [];
    try {
      countryNameListFromPackage =
        UserRes[0].PurchasePackageData[0].countryNameList;
    } catch (error) {
      console.log("No user package found");
    }
    const result = await Contribute.find({
      $or: [
        { contributePaidFreeStatus: "free" },
        {
          contributetype: "Book",
          countryNameList: { $in: countryNameListFromPackage },
          contributeRequestStatus: true,
          contributeTrashStatus: false,
        },
      ],
    }).exec();
    console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ error });
  }
};
//get headnotes data
exports.getHeadNotesForEdit = async (req, res) => {
  try {
    const id = req.headers.id;

    const details = await Contribute.findById(id).exec();
    //const dataForRenterUserId = await User.findById(reviewDetails.renterUserId);

    res.json({
      caseHeadNotes: details.caseHeadNotes,
      caseSummary: details.caseSummary,
      caseOpinions: details.caseOpinions,
    });
  } catch (error) {
    res.json({ message: error });
  }
};
//update headnoted
exports.updateHeadNotes = async (req, res) => {
  try {
    const { id, caseHeadNotes, caseSummary, caseOpinions } = req.body;

    await Contribute.findByIdAndUpdate(id, {
      $set: {
        caseHeadNotes: caseHeadNotes,
        caseSummary: caseSummary,
        caseOpinions: caseOpinions,
      },
    });

    return res.json({
      caseHeadNotes: caseHeadNotes,
      caseSummary: caseSummary,
      caseOpinions: caseOpinions,
    });
  } catch (error) {
    res.json({ message: error });
  }
};

exports.getContributeCaseLawList = async (req, res) => {
  const _id = mongoose.Types.ObjectId(req.ID);
  try {
    //finding data who has same user id

    const UserRes = await User.aggregate([
      {
        $match: {
          _id: _id,
        },
      },
      {
        $lookup: {
          from: "purchasepackagedatas",
          localField: "purchasePackageId",
          foreignField: "_id",
          as: "PurchasePackageData",
        },
      },
    ]);

    let countryNameListFromPackage = [];
    try {
      countryNameListFromPackage =
        UserRes[0].PurchasePackageData[0].countryNameList;
    } catch (error) {
      console.log("No user package found");
    }
    const result = await Contribute.find({
      $or: [
        { contributePaidFreeStatus: "free" },
        {
          contributetype: "caselaw",
          countryNameList: { $in: countryNameListFromPackage },
          contributeRequestStatus: true,
          contributeTrashStatus: false,
        },
      ],
    }).exec();

    res.status(200).json({ result });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ error });
  }
};

exports.getContributeJournalArticleList = async (req, res) => {
  const _id = mongoose.Types.ObjectId(req.ID);

  try {
    //finding data who has same user id

    const UserRes = await User.aggregate([
      {
        $match: {
          _id: _id,
        },
      },
      {
        $lookup: {
          from: "purchasepackagedatas",
          localField: "purchasePackageId",
          foreignField: "_id",
          as: "PurchasePackageData",
        },
      },
    ]);

    let countryNameListFromPackage = [];
    try {
      countryNameListFromPackage =
        UserRes[0].PurchasePackageData[0].countryNameList;
    } catch (error) {
      console.log("No user package found");
    }
    const result = await Contribute.find({
      $or: [
        { contributePaidFreeStatus: "free" },
        {
          contributetype: "Journal Article",
          countryNameList: { $in: countryNameListFromPackage },
          contributeRequestStatus: true,
          contributeTrashStatus: false,
        },
      ],
    }).exec();

    res.status(200).json({ result });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ error });
  }
};

exports.getallcontributeLaws = async (req, res) => {
  const _id = mongoose.Types.ObjectId(req.ID);

  try {
    //finding data who has same user id

    const UserRes = await User.aggregate([
      {
        $match: {
          _id: _id,
        },
      },
      {
        $lookup: {
          from: "purchasepackagedatas",
          localField: "purchasePackageId",
          foreignField: "_id",
          as: "PurchasePackageData",
        },
      },
    ]);

    let countryNameListFromPackage = [];
    try {
      countryNameListFromPackage =
        UserRes[0].PurchasePackageData[0].countryNameList;
    } catch (error) {
      console.log("No user package found");
    }
    const result = await Contribute.find({
      $or: [
        { contributePaidFreeStatus: "free" },
        {
          contributetype: "Laws",
          countryNameList: { $in: countryNameListFromPackage },
          contributeRequestStatus: true,
          contributeTrashStatus: false,
        },
      ],
    }).exec();

    res.status(200).json({ result });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ error });
  }
};

exports.getallcontributeInsight = async (req, res) => {
  const _id = mongoose.Types.ObjectId(req.ID);

  try {
    //finding data who has same user id

    const UserRes = await User.aggregate([
      {
        $match: {
          _id: _id,
        },
      },
      {
        $lookup: {
          from: "purchasepackagedatas",
          localField: "purchasePackageId",
          foreignField: "_id",
          as: "PurchasePackageData",
        },
      },
    ]);

    let countryNameListFromPackage = [];
    try {
      countryNameListFromPackage =
        UserRes[0].PurchasePackageData[0].countryNameList;
    } catch (error) {
      console.log("No user package found");
    }
    const result = await Contribute.find({
      $or: [
        { contributePaidFreeStatus: "free" },
        {
          contributetype: "Insight",
          countryNameList: { $in: countryNameListFromPackage },
          contributeRequestStatus: true,
          contributeTrashStatus: false,
        },
      ],
    }).exec();

    res.status(200).json({ result });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ error });
  }
};

exports.getContributeDetails = async (req, res) => {
  try {
    const id = req.query.id;
    const result = await Contribute.findById(id);
    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ error });
  }
};
