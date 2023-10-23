const SubjectArea = require("../models/SubjectArea");
const User = require("../models/user");
var mongoose = require("mongoose");
exports.subjectAreaDataPost = async (req, res) => {
  const {
    disputeResolutionList,
    featuredList,
    practiceArea,
    sectors,
    resources,
    countryNameList,
    regionNameList,
    subsidaryPrinciple,
  } = req.body;
  const userId = req.ID;

  //saving user info into db
  const result = await User.findById(userId).exec();
  let subjectarea = new SubjectArea({
    disputeResolutionList,
    featuredList,
    practiceArea,
    sectors,
    resources,
    countryNameList,
    regionNameList,
    subsidaryPrinciple,
    authorId: result._id,
    authorName: result.firstname,
  });

  // save model to databaseb
  subjectarea.save(function (err, data) {
    console.log(data);
    if (err) res.status(404).json({ err });
    else {
      res.status(200).json({ data: data });
    }
  });
};
exports.subjectAreaDataUpdate = async (req, res) => {
  const {
    disputeResolutionList,
    featuredList,
    practiceArea,
    sectors,
    resources,
    countryNameList,
    regionNameList,
    subsidaryPrinciple,
    _id
  } = req.body;
  const userId = req.ID;

  //saving user info into db
  const result = await User.findById(userId).exec();
  let subjectarea = {
    disputeResolutionList,
    featuredList,
    practiceArea,
    sectors,
    resources,
    countryNameList,
    regionNameList,
    subsidaryPrinciple,
    authorId: result._id,
    authorName: result.firstname,
  };

  SubjectArea.findOneAndUpdate({ _id },
    subjectarea, null, function (err, docs) {
      if (err) res.status(404).json({ err });
      else {
        res.status(200).json({ subjectareaId: _id});
      }
    });
};

//get all subject area

exports.getallSubjectData = async (req, res) => {
  // const _id = req.ID;

  try {
    //finding data who has same user id
    const result = await SubjectArea.find().exec();

    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ error });
  }
};

//singe subject area
exports.getSubjectAreaDetails = async (req, res) => {
  try {
    const id = req.query.id;

    const result = await SubjectArea.findById(id);
    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ error });
  }
};
