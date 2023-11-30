const Favourite = require("../models/favourite");
const mongoose = require("mongoose");

exports.favouriteUpdate = async (req, res) => {
  try {
    const { userId, contributeDataId } = req.body;
    const doc = await Favourite.findOneAndUpdate(
      { userId, contributeDataId },
      { $set: { contributeDataId } },
      { upsert: true, new: true }
    );
    res.json({
      message: "Successfully updated",
    });
  } catch (error) {
    res.json({ message: error });
  }
};

exports.favouriteAllInformation = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id);
    const invoiceAllInfoDetails = await Favourite.aggregate([
      { $match: { userId: userId } },
      {
        $lookup: {
          from: "contributes", // collection to join
          localField: "contributeDataId", //this field as refereence
          foreignField: "_id",
          as: "contributeFavData", // output array field
        },
      },
    ]).exec();

    const favContributelist = invoiceAllInfoDetails.map((item) => {
      return item.contributeFavData[0];
    });

    res.json({
      favContributelist,
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

exports.favouriteDelete = async (req, res) => {
  try {
    const { userId, contributeDataId } = req.body;
    const doc = await Favourite.findOneAndDelete({ userId, contributeDataId });
    res.json({
      message: "Successfully deleted",
    });
  } catch (error) {
    res.json({ message: error });
  }
};

//all fav journal

exports.favouriteAllInfoContent = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id);
    const invoiceAllInfoDetails = await Favourite.aggregate([
      { $match: { userId: userId } },
      {
        $lookup: {
          from: "contributes", // collection to join
          localField: "contributeDataId", //this field as refereence
          foreignField: "_id",
          as: "contributeFavData", // output array field
        },
      },
    ]).exec();

    const favContributelist = invoiceAllInfoDetails.map((item) => {
      console.log(item);
      return item.contributeFavData[0];
    });

    res.json({
      favContributelist,
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};
