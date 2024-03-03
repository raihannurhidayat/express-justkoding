const express = require("express");
const {
  getAllCategories,
  getCategoriByName,
  createCategori,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories.controller");
const {
  authMiddleware,
  permisionUser,
} = require("../middleware/User.middleware");

const router = express.Router();
router.get("/", getAllCategories);
router.post("/", authMiddleware, permisionUser("admin"), createCategori);
router.get(
  "/:id",
  authMiddleware,
  permisionUser("admin","user"),
  getCategoriByName
);
router.put("/:id", authMiddleware, permisionUser("admin"), updateCategory);
router.delete("/:id", authMiddleware, permisionUser("admin"), deleteCategory);

module.exports = router;
