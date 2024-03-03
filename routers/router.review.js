const express = require("express");
const { authMiddleware } = require("../middleware/User.middleware");
const { createOrUpdateReview } = require("../controllers/review.controller");
const router = express.Router();

router.post("/:productId", authMiddleware, createOrUpdateReview);

module.exports = router;
