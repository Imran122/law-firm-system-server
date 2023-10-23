const User = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
exports.createMember = async (req, res) => {
    const { email } = req.body;
    console.log(email)
    let allmember = [];
    try {
        const id = mongoose.Types.ObjectId(req.ID);
        let result = await User.findById(id);

        if (result?.is_agent===false) {
            return res.status(200).json({
                message:"Please become agent first!!!",
                allmember
            });
        }
        User.find({ email }, async function (err, docs) {
            if (err) {
                console.log(err);
            }
            // console.log(docs);
            let message = 'Something error';
            let statuscode = 200;
            if (docs.length > 0) {
                console.log(id);
                console.log(docs[0]._id);
                if (id.toString() == docs[0]._id.toString()) {
                    message = "Cann't add your own profile"
                    statuscode = 404;
                } else {
                    let result = await User.findByIdAndUpdate(docs[0]._id, {
                        $set: {
                            agentId: id
                        },
                    });
                    // console.log(res);
                    allmember = await User.find({ agentId: id });
                    message = "Member added successfully";
                    statuscode = 200;            
                }

            } else {
                message = "User not found";
                statuscode = 404;            
                
            }
            return res.status(statuscode).json({
                message,
                allmember
            });
        });
    } catch (error) {
        return res.status(401).json({
            error
        });
    }
};

exports.allmember = async (req, res) => {

    try {
        const id = mongoose.Types.ObjectId(req.ID);

        const UserRes = await User.find({ agentId: id });

          return res.send(UserRes)
    } catch (error) {
        return res.status(401).json({
            error
        });
    }
};
exports.becomeAgent = async (req, res) => {

    try {
        const id = mongoose.Types.ObjectId(req.ID);

        let result = await User.findByIdAndUpdate(id, {
            $set: {
                is_agent: true
            },
        });

        return res.status(200).json({
            message : "Successfully become an agent. Now you can add member"
        });
    } catch (error) {
        return res.status(401).json({
            error
        });
    }
};
exports.deletemember = async (req, res) => {

    try {

        const memberId = mongoose.Types.ObjectId(req.query.memberId);

        const user = await User.findOne({ _id: memberId });
        // Delete role field
        user.agentId = undefined

        // Save changes
        await user.save()
        console.log(user)
        return res.status(200).json({
            message:"Successfully remove this member"
        });
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            error
        });
    }
};
