const ContributeContent = require("../models/ContributeContent");

exports.contributecontentcreate = async (req, res) => {
    const { contributeId, content, contentTitle, parentcontributecontentId } = req.body;

    let contributeContent = new ContributeContent({
        contributeId, content, contentTitle, parentcontributecontentId
    });

    // save model to database
    contributeContent.save(function (err, data) {
        if (err) res.status(404).json({ err });
        else {
            res.status(200).json(data);
        }
    });
};

exports.contributecontentupdate = async (req, res) => {
    const { contributecontentId, content, contentTitle } = req.body;
    const _id = contributecontentId;
    try {
        ContributeContent.findByIdAndUpdate(_id, { content, contentTitle },
            function (err, docs) {
                if (err) {
                    res.status(404).json({ err });
                }
                else {
                    res.status(200).json({ msg:"Successfully updated the content" });
                }
            });
    } catch (error) {
        res.status(404).json({ error });

    }
};

exports.contributecontentbycontributeId = async (req, res) => {
    const { contributeId } = req.query;

    try {

        //finding data who has same user id
        const result = await ContributeContent.find({
            contributeId: { $in: [contributeId] },
        });
        res.status(200).json({ result });

    } catch (error) {
        res.status(404).json({ error });

    }
};