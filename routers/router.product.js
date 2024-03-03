const express = require("express");
const {
  addProduct,
  detailProduct,
  readProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const multer = require("multer");
const upload = require("../utils/fileUpload");
const {
  authMiddleware,
  permisionUser,
} = require("../middleware/User.middleware");

const router = express.Router();

router.get("/", readProduct);
router.post(
  "/",
  authMiddleware,
  permisionUser("admin"),
  upload.single("image"),
  addProduct
);
router.get("/:id", detailProduct);
router.delete("/:id", authMiddleware, permisionUser("admin"), deleteProduct);
router.put(
  "/:id",
  authMiddleware,
  permisionUser("admin"),
  upload.single("image"),
  updateProduct
);

module.exports = router;
