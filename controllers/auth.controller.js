const { User } = require("../models");
const { profile } = require("../models");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expire: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "Success",
    token,
    data: {
      user,
    },
  });
};

const registerUser = async (req, res) => {
  try {
    let { name, email, password, passwordConfirm } = req.body;
    if (password !== passwordConfirm) {
      return res.status(400).json({
        message: "Validasi Error",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    createSendToken(newUser, 201, res);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Validasi Error",
      error: error,
    });
  }
};

const loginUser = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      status: "fail",
      message: "error validasi",
      error: "please input email or password!",
    });
  }

  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (
      !userData ||
      !(await userData.CorrectPassword(req.body.password, userData.password))
    ) {
      return res.status(400).json({
        status: "fail",
        message: "error login",
        error: "invalid email or password",
      });
    }

    createSendToken(userData, 200, res);
  } catch (error) {
    return res.status(400).json({
      message: "error",
      error,
    });
  }
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "logout berhasil",
  });
};

const getMyUser = async (req, res) => {
  const currentUser = await User.findOne({
    where: {
      id: req.user.id,
    },
    include: [
      {
        model: profile,
        attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
      },
    ],
    attributes: { exclude: ["createdAt", "updatedAt", "password"] },
  });

  if (currentUser) {
    return res.status(200).json({
      data: currentUser,
    });
  }

  return res.status(404).json({
    message: "user tidak ditemukan",
  });
};

module.exports = { registerUser, loginUser, logout, getMyUser };
