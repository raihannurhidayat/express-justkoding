const { Category } = require("../models");
const { Product } = require("../models");
const asyncHandler = require("../middleware/asyncHandle.middleware");

const getAllCategories = async (req, res) => {
  const data = await Category.findAll();

  res.status(200).json({
    status: "success",
    data,
  });
};

const getCategoriByName = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Category.findByPk(id, {
      include: {
        model: Product,
        attributes: { exclude: ["categoryId"] },
      },
    });
    if (!data) {
      return res.json({
        status: "fail",
        error: {
          message: "ID Category Tidak Ditemukan",
        },
      });
    }
    return res.json({
      status: "Success",
      data,
    });
  } catch (error) {
    res.json({
      status: "fail",
      error: {
        message: "ID Category Tidak Ditemukan",
      },
    });
  }
};

const createCategori = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const data = await Category.create({
    name,
    description: description,
  });

  return res.json({
    status: "success",
    msg: "Category Berhasil Ditambahkan",
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  await Category.update(
    { name, description: description },
    {
      where: {
        id,
      },
    }
  );
  const category = await Category.findByPk(id);

  if (!category) {
    res.status(404);
    throw new Error("Category Tidak Ditemukan");
  }

  return res.status(201).json({
    status: "success",
    message: "category updated",
    data: category,
  });
});

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  if (!category) {
    return res
      .status(404)
      .json({ status: "Fail", message: "category tidak ditemukan" });
  }

  try {
    await Category.destroy({ where: { id } });
    return res
      .status(201)
      .json({ status: "Success", message: "category berhasil dihapus" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Fail", message: "Something Wrong!" });
  }
};

module.exports = {
  getAllCategories,
  getCategoriByName,
  createCategori,
  updateCategory,
  deleteCategory,
};
