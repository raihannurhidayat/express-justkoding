"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Name Product SUdah Ada Silahkan masukan Name yang lain",
        },
        validate: {
          notNull: {
            msg: "Inputan Name Harus Diisi",
          },
        },
      },
      description: DataTypes.STRING,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Inputan Price Harus Diisi",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Inputan CategoryID Harus Diisi",
          },
          isExist(value) {
            return sequelize.models.Category.findByPk(value).then((el) => {
              if (!el) {
                throw new Error("Category Tidak Ditemukan");
              }
            });
          },
        },
        // isInt: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      countReview: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      avgReview: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Inputan Image Harus Diisi",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
