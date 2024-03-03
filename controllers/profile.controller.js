const asyncHandler = require("../middleware/asyncHandle.middleware");
const { profile } = require("../models");

const updateOrCreateProfile = asyncHandler(async (req, res) => {
  const { age, bio, address } = req.body;

  const idUser = req.user.id;

  const userData = await profile.findOne({
    where: {
      userId: idUser,
    },
  });

  let message = "";

  if (userData) {
    await profile.update(
      {
        age: age || userData.age,
        bio: bio || userData.bio,
        address: address || userData.address,
      },
      {
        where: {
          userId: idUser,
        },
      }
    );

    message = "Profile berhasil di update";
  } else {
    await profile.create({
      age,
      bio,
      address,
      userId: idUser,
    });

    message = "Profile Berhasil Dibuat";
  }

  return res.status(200).json({
    message,
  });
});

module.exports = { updateOrCreateProfile };
