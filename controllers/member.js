const Favourite = require("../models/favourite");
const User = require("../models/user");
const Contribute = require("../models/Contribute");
const mongoose = require("mongoose");
const SubjectArea = require("../models/SubjectArea");
exports.favouriteAllBookInfor = async (req, res) => {
  const _id = mongoose.Types.ObjectId(req.ID);
  try {
    const FavBook = await Favourite.aggregate([
      {
        $match: {
          userId: _id,
        },
      },
      {
        $lookup: {
          from: "contributes",
          localField: "contributeDataId",
          foreignField: "_id",
          // contributetype: { $ne: "Book" },
          as: "MyFavData",
        },
      },
    ]);
    let favContributelist = FavBook.filter(
      (item) => item.MyFavData[0].contributetype === "Book"
    );
    /* let favContributelist = FavBook.map((item) => {
      console.log(item);
      if (item.MyFavData.contributetype === "Book") {
        return item.MyFavData;
      }
    }); */

    res.json({ favContributelist });
  } catch (error) {
    res.json({ message: error });
  }
};

exports.favouriteDeleteDasboard = async (req, res) => {
  try {
    const { _id } = req.body;
    const doc = await Favourite.findOneAndDelete({ _id });
    res.json({
      message: "Successfully deleted",
    });
  } catch (error) {
    res.json({ message: error });
  }
};

exports.favouriteAllContentInfo = async (req, res) => {
  const _id = mongoose.Types.ObjectId(req.ID);
  try {
    const FavBook = await Favourite.aggregate([
      {
        $match: {
          userId: _id,
        },
      },
      {
        $lookup: {
          from: "contributes",
          localField: "contributeDataId",
          foreignField: "_id",
          // contributetype: { $ne: "Book" },
          as: "MyFavData",
        },
      },
    ]);
    let favContributelist = FavBook.filter(
      (item) => item.MyFavData[0].contributetype !== "Book"
    );
    /* let favContributelist = FavBook.map((item) => {
        console.log(item);
        if (item.MyFavData.contributetype === "Book") {
          return item.MyFavData;
        }
      }); */

    res.json({ favContributelist });
  } catch (error) {
    res.json({ message: error });
  }
};

//api for my contribute books
exports.getcontributeBookByUser = async (req, res) => {
  // const _id = req.ID;

  try {
    //finding data who has same user id
    const userId = req.ID;
    console.log(userId);
    const result = await Contribute.find({
      contributetype: "Book",
      contributeTrashStatus: false,
      authorId: userId,
    }).exec();
    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ error });
  }
};
//api for my contribute article
exports.getcontributeArticleByUser = async (req, res) => {
  try {
    const userId = req.ID;
    console.log(userId);
    const result = await Contribute.find({
      contributetype: "Journal Article",
      contributeTrashStatus: false,
      authorId: userId,
    }).exec();
    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ error });
  }
};

//api for my contribute insight
exports.getcontributeInsightByUser = async (req, res) => {
  try {
    const userId = req.ID;
    console.log(userId);
    const result = await Contribute.find({
      contributetype: "Insight",
      contributeTrashStatus: false,
      authorId: userId,
    }).exec();
    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ error });
  }
};

//api for my contribute case law
exports.getcontributeCaseLawByUser = async (req, res) => {
  try {
    const userId = req.ID;
    console.log(userId);
    const result = await Contribute.find({
      contributetype: "caselaw",
      contributeTrashStatus: false,
      authorId: userId,
    }).exec();
    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ error });
  }
};

//api for my contribute  law
exports.getcontributeLawsByUser = async (req, res) => {
  try {
    const userId = req.ID;
    console.log(userId);
    const result = await Contribute.find({
      contributetype: "Laws",

      authorId: userId,
      contributeTrashStatus: false,
    }).exec();
    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ error });
  }
};
//api for my contribute  subject area
exports.getcontributeSubjectAreaByUser = async (req, res) => {
  try {
    const userId = req.ID;
    console.log(userId);
    const result = await SubjectArea.find({
      authorId: userId,
      contributeTrashStatus: false,
    }).exec();
    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ error });
  }
};
