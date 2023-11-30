const express = require('express');
const router = express.Router();

// import controller
const {
    contributecontentcreate,
    contributecontentbycontributeId,
    contributecontentupdate
} = require('../controllers/contributecontent');

// import validators
const {
    userSignupValidator,
    userSigninValidator
} = require('../validators/auth');

const { authenticate } = require("../middleware/authurize");

const { runValidation } = require('../validators');

router.post('/contribute-content-create', authenticate, contributecontentcreate);
router.put('/contribute-content-update', authenticate, contributecontentupdate);
router.get('/contribute-content-bycontributeId', authenticate, contributecontentbycontributeId);

module.exports = router;