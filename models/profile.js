"use strict";
const { Model } = require("sequelize");
const { Sequelize } = require(".");
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  profile.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Inputan Umur Harus Diisi",
          },
        },
      },
      bio: {
        type: DataTypes.TEXT,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Inputan Address Harus Diisi",
          },
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Inputan user_id Harus Diisi",
          },
          isExist(value) {
            return sequelize.models.User.findByPk(value).then((el) => {
              if (!el) {
                throw new Error("User Id Tidak Ditemukan");
              }
            });
          },
        },
      },
    },
    {
      sequelize,
      modelName: "profile",
    }
  );
  return profile;
};
