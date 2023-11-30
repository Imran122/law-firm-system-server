const PackageData = require("../models/packageData");
const User = require("../models/user");
const mailgun = require("mailgun-js");
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});
exports.createPackages = async (req, res) => {
  //console.log("UPDATE USER - req.user", req.user, "UPDATE DATA", req.body);
  const { id } = req.body;

  const {
    packageName,
    packagesPrice,
    discountPrice,
    vatAmount,
    cuponCode,
    cuponDiscountPrice,
    cuponExpireDate,
    countryNameList,
    regionNameList,
    featuresOffered,
    packageType,
    institutionName,
    locationOfThePerson,
    postionOfThePerson,
    emailOfThePerson,
    phoneOfThePerson,
    contactDurationForCustomPackage,
    noteForCustomPackage,
    contractStartDate,
    contractEndDate,
  } = req.body;

  var packageData = new PackageData({
    packageName,
    packagesPrice,
    discountPrice,
    vatAmount,
    cuponCode,
    cuponDiscountPrice,
    cuponExpireDate,
    countryNameList: req.body.countryList,
    regionNameList: req.body.regionList,
    featuresOffered: req.body.featuresList,
    packageType,
    institutionName,
    locationOfThePerson,
    postionOfThePerson,
    emailOfThePerson,
    phoneOfThePerson: req.body.phonevalue,
    contactDurationForCustomPackage,
    noteForCustomPackage,
    contractStartDate,
    contractEndDate,
  });

  packageData.save(async function (err, data) {
    if (err) return console.error(err);
    else {
      /******************/
      const Pkgid = data._id;

      const userDetails = await PackageData.findById(Pkgid).exec();
      const userEmail = userDetails.emailOfThePerson;

      const emailData = {
        from: process.env.EMAIL_FROM,
        to: userEmail,
        subject: `custom package payment link`,
        html: `

        <div bgcolor="#f6f6f6" style="color: #333; height: 100%; width: 100%;" height="100%" width="100%">
        <table bgcolor="#f6f6f6" cellspacing="0" style="border-collapse: collapse; padding: 40px; width: 100%;" width="100%">
            <tbody>
                <tr>
                    <td width="5px" style="padding: 0;"></td>
                    <td style="clear: both; display: block; margin: 0 auto; max-width: 600px; padding: 10px 0;">
                        <table width="100%" cellspacing="0" style="border-collapse: collapse;">
                            <tbody>
                                <tr>
                                    <td style="padding: 0;">
                                        <a
                                            href="#"
                                            style="color: #348eda;"
                                            target="_blank"
                                        >
                                            <img
                                                src="https://i.ibb.co/52qqf4x/download.png"
                                                alt="Bootdey.com"
                                                style="height: 50px; max-width: 100%; width: 157px;"
                                                height="50"
                                                width="157"
                                            />
                                        </a>
                                    </td>
                                    <td style="color: #999; font-size: 12px; padding: 0; text-align: right;" align="right">
                                        Africa Juris<br />
                                       
                                       
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td width="5px" style="padding: 0;"></td>
                </tr>
    
                <tr>
                    <td width="5px" style="padding: 0;"></td>
                    <td bgcolor="#FFFFFF" style="border: 1px solid #000; clear: both; display: block; margin: 0 auto; max-width: 600px; padding: 0;">
                        <table width="100%" style="background: #f9f9f9; border-bottom: 1px solid #eee; border-collapse: collapse; color: #999;">
                            <tbody>
                                <tr>
                                    <td width="50%" style="padding: 20px;"><strong style="color: #333; font-size: 24px;">$ ${userDetails.packagesPrice}</strong> </td>
                                    <td align="right" width="50%" style="padding: 20px;">Thanks for using <span class="il">Africa Juris</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td style="padding: 0;">
                        
    
                    </td>
                    <td width="5px" style="padding: 0;">
                    
                    </td>
                </tr>
                <tr>
                    <td width="5px" style="padding: 0;"></td>
                    <td style="border: 1px solid #000; border-top: 0; clear: both; display: block; margin: 0 auto; max-width: 600px; padding: 0;">
                        <table cellspacing="0" style="border-collapse: collapse; border-left: 1px solid #000; margin: 0 auto; max-width: 600px;">
                            <tbody>
                                <tr>
                                    <td valign="top"  style="padding: 20px;">
                                        <h3
                                            style="
                                                border-bottom: 1px solid #000;
                                                color: #000;
                                                font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
                                                font-size: 18px;
                                                font-weight: bold;
                                                line-height: 1.2;
                                                margin: 0;
                                                margin-bottom: 15px;
                                                padding-bottom: 5px;
                                            "
                                        >
                                            Summary
                                        </h3>
                                        <table cellspacing="0" style="border-collapse: collapse; margin-bottom: 40px;">
                                            <tbody>
                                                <tr>
                                                    <td style="padding: 5px 0;">Package Duration</td>
                                                    <td align="right" style="padding: 5px 0;text-align:right">:   ${userDetails.contactDurationForCustomPackage}</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 5px 0;">Package Price</td>
                                                    <td align="right" style="padding: 5px 0;text-align:right">  $ ${userDetails.packagesPrice}</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td style="border-bottom: 2px solid #000; border-top: 2px solid #000; font-weight: bold; padding: 5px 0;">Total Amount </td>
                                                    <td align="right" style="border-bottom: 2px solid #000; border-top: 2px solid #000; font-weight: bold; padding: 5px 0;">$ ${userDetails.packagesPrice}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td width="5px" style="padding: 0;"></td>
                </tr>
    
                
            </tbody>
        </table>
    </div>
    







        
                  <h1>Please use the following link to make payment $ ${userDetails.packagesPrice} for custom offer packages</h1>
                  <p>${process.env.CLIENT_URL}/custom-package-payment/${Pkgid}</p>
                  <hr />
                  <p>This email may contain sensetive information</p>
                  <p>${process.env.CLIENT_URL}</p>
              `,
      };

      mg.messages().send(emailData, function (error, body) {
        console.log(error);
        if (error) {
          return res.json({
            error,
          });
        }
        console.log(body);
        return res.json({
          message: `Email has been sent to ${userEmail}. Follow the instruction to make payment for custom offer packages`,
          data: data,
        });
      });
      /******************/
      /* 
      return res.json({
        data: data,
      }); */
    }
  });
};

//package list all
exports.packageListData = async (req, res) => {
  try {
    const packageList = await PackageData.find({});
    res.json(packageList);
  } catch (error) {
    res.json({ message: error });
  }
};

//single package data get for edit
exports.packageDetailsInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const packageDetails = await PackageData.findById(id).exec();
    res.json(packageDetails);
  } catch (error) {
    res.json({ message: error });
  }
};

//update package details
exports.updatePackage = async (req, res) => {
  try {
    const packageId = await PackageData.findById({ _id: req.headers.id });

    let bodyresult = req.body;

    Object.assign(packageId, bodyresult);
    packageId.save();
    res.send({ data: bodyresult });
  } catch (error) {
    res.json({ message: error });
  }
};
