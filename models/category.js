"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Product, {
        foreignKey: "categoryId",
      });
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Name Category Sudah Ada !",
        },
        validate: {
          notNull: {
            msg: "Inputan Name Tidak Boleh Kosong",
          },
        },
      },
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Category",
      hooks: {
        afterValidate: (category, options) => {
          if (category.name) {
            category.name = category.name.toLowerCase();
          }
        },
      },
    }
  );
  return Category;
};
