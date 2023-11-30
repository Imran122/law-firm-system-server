var axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const tokenEndpoint = process.env.AUTH0_TOKENENDPOINT;

exports.signin = (req, res) => {

    const domain = process.env.AUTH0_DOMAIN;
    const audience = process.env.AUTH0_AUDIENCE;
    const scope = "read:challenges";
    const clientId = process.env.AUTH0_CLIENTID;
    const responseType = "code";
    const redirectUri = process.env.AUTH0_REDIRECT_URI;

    // const response = await fetch(
    //   `https://${domain}/authorize?` + 
    //   `audience=${audience}&` + 
    //   `scope=${scope}&` +
    //   `response_type=${responseType}&` +
    //   `client_id=${clientId}&` +
    //   `redirect_uri=${redirectUri}`, {
    //     redirect: "manual"
    //   }
    // );

    // window.location.replace(response.url);

    const url = `https://${domain}/authorize?` +
        `audience=${audience}&` +
        `scope=${scope}&` +
        `response_type=${responseType}&` +
        `client_id=${clientId}&` +
        `redirect_uri=${redirectUri}`;

    return res.json({ url });
};
exports.signout = (req, res) => {

    const domain = process.env.AUTH0_DOMAIN;
    const clientId = process.env.AUTH0_CLIENTID;
    const returnTo = process.env.AUTH0_SINGOUT_RETURNTO;

    // const response = await fetch(
    //   `https://${domain}/logout?client_id=${clientId}&returnTo=${returnTo}`,
    //   { redirect: "manual" }
    // );

    const url = `https://${domain}/logout?client_id=${clientId}&returnTo=${returnTo}`;

    return res.json({ url });
};
exports.authorization = (req, res) => {

    var code = req.query.code;

    // console.log('server code', code);

    if (!code) {
        res.status(401).send("Missing authorization code");
    }

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", process.env.AUTH0_CLIENTID);
    params.append("client_secret", process.env.AUTH0_CLIENT_SECRET)
    params.append("code", code);
    params.append("redirect_uri", process.env.AUTH0_REDIRECT_URI);

    axios.post(tokenEndpoint, params)
        .then(response => {
            //   console.log('response.......',response);
            //   console.log('response.data.......',response.data);


            const token = response.data.access_token;
            const { useremail } =
                jwt.decode(token);

            User.findOne({ email: useremail }).exec((err, user) => {

                if (err) {
                    return res.status(400).json({
                        error: 'Something error.. Please try again!!!'
                    });
                }
                if (user) {

                    const { role, loginType, email, _id, firstname } = user;
                    return res.json({
                        token,
                        user: { _id, firstname, email, role, loginType },
                    });
                };

                let newUser = new User({ email: useremail, role: 'member', loginType: 'Auth0', firstname:'Auth0 User' });

                newUser.save((err, success) => {
                    if (err) {
                        console.log('SIGNUP ERROR', err);
                        return res.status(400).json({
                            error: err
                        });
                    }
                    const { role, loginType, email, _id, firstname } = success;
                    return res.json({
                        token,
                        user: { _id, firstname, email, role, loginType },
                    });
                });
                // return res.json({ useremail });
            });

        })
        .catch(err => {
            //   console.log(err);
            res.status(403).json(`Reason: ${err.message}`);
        })
};
