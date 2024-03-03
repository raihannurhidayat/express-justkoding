const express = require("express");
const router = express.Router();
const { updateOrCreateProfile } = require("../controllers/profile.controller");
const { authMiddleware } = require("../middleware/User.middleware");

router.post("/", authMiddleware, updateOrCreateProfile);

module.exports = router;
