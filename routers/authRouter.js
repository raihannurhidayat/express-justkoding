const express = require("express");

const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getMyUser,
} = require("../controllers/auth.controller");
const { authMiddleware } = require("../middleware/User.middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware ,getMyUser)

module.exports = router;
