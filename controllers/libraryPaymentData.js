const LibraryPaymentData = require("../models/libraryPaymentData");
const PackageData = require("../models/packageData");
const PurchasePackageData = require("../models/PurchasePackageData");
const User = require("../models/user");
const cors = require("cors")({ origin: true });
const stripe = require("stripe")(process.env.STRIPE_SECRET);
exports.create = async (req, res) => {
  //console.log("UPDATE USER - req.user", req.user, "UPDATE DATA", req.body);

  let {
    packageChargeTimeName,
    paymentStatus,
    paidAmount,
    countryNameList,
    regionNameList,
  } = req.body.membershipPaymentData;
  //let pickupAddress = JSON.parse(pickupAddress);
  const Pkgid = req.body.packageId;

  const packageDetails = await PackageData.findById(Pkgid).exec();
  if (packageDetails.packageType==='custom-package') {
    countryNameList=countryNameList;
    regionNameList=regionNameList;
  }

  const userId = req.ID;

  //saving user info into db
  const result = await User.findById(userId).exec();
  //find host id who uploaded the car



  var purchasePackageData = new PurchasePackageData({
    userIdWhoPaid: result._id,
    packageId: Pkgid,
    countryNameList,
    regionNameList,
    packageName: packageDetails.packageName,
    packagesPrice: packageDetails.packagesPrice,
    featuresOffered: packageDetails.featuresOffered,
    packageChargeTimeName,
  });

  // save model to database
  purchasePackageData.save(function (err, data) {
    if (err) return res.json(error);
    else {

      console.log('data', data);
      return cors(req, res, async () => {

        try {
          const { id, paidAmount, membershipPaymentData } = req.body;

          const amount = parseFloat(paidAmount) * 100;

          console.log('paidAmount ',paidAmount);
          console.log('amount ',amount);
          const paymentIntent = await stripe.paymentIntents.create({
            currency: "USD",
            amount: amount,
            payment_method: id,
            confirm: true,
          });

          var libraryPaymentData = new LibraryPaymentData({
            userIdWhoPaid: result._id,
            packageId: Pkgid,
            purchasePackageId: data._id,
            paymentStatus,
            paidAmount,
          });

          await libraryPaymentData.save();
          console.log('libraryPaymentData before findoneupdate ' ,libraryPaymentData);
          await User.findOneAndUpdate({ _id: userId }, { purchasePackageId: data._id });
          res.json({ clientSecret: paymentIntent.client_secret, data: data._id });

        } catch (error) {

          console.log('error from library paymeny',error)
          res.json(error);

        }

        // response.status(200).json({subscriptionId: 'subscription.id'})
      });
    }
  });
};
