const { User, Role } = require("../models");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  // fungsi jika di header dimasukan token atau tidak
  let token;
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  // }

  token = req.cookies.jwt
  if (!token) {
    return next(
      res.status(401).json({
        status: 401,
        message: "Anda Belum Login/register",
        error: "Token tidak ditemukan",
      })
    );
  }

  // Decode verifikasi dari token
  let decode;

  try {
    decode = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    next(
      res.status(401).json({
        error: error,
        message: "Token in Valid",
      })
    );
  }

  // ambil data user berdasarkan kondisi decodenya
  const user = await User.findByPk(decode?.id);
  if (!user) {
    return next(
      res
        .status(401)
        .json({ status: 401, message: "Token tidak bisa digunakan" })
    );
  }

  req.user = user;

  next();
};

const permisionUser = (...roles) => {
  return async (req, res, next) => {
    const rolesData = await Role.findByPk(req.user.role_id);
    console.log(...roles)
    const roleName = rolesData.name;
    if (!roles.includes(roleName)) {
      return next(
        res
          .status(403)
          .json({ error: "anda tidak bisa mengakses halaman ini!" })
      );
    }

    next();
  };
};

module.exports = { authMiddleware, permisionUser };
