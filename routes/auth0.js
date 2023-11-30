const express = require('express');
const router = express.Router();

// import controller
const {
    signin,
    authorization,
    signout
} = require('../controllers/auth0');

// router.post('/signup', userSignupValidator, runValidation, signup);
// router.post('/account-activation', accountActivation);
router.get('/signin', signin);
router.get('/authorization', authorization);
router.get('/signout', signout);

module.exports = router;
