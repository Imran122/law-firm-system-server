const express = require("express");
const router = express.Router();

// import controller
const { createMember,allmember,deletemember,becomeAgent } = require("../controllers/agent");
const { authenticate } = require("../middleware/authurize");

router.post("/memberadd", authenticate, createMember);
router.get("/all-member", authenticate, allmember);
router.put("/delete-member", authenticate, deletemember);
router.post("/become-agent", authenticate, becomeAgent);

module.exports = router;