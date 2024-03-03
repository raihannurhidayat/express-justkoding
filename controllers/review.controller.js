const asyncHandler = require("../middleware/asyncHandle.middleware");
const { Review } = require("../models");

const createOrUpdateReview = asyncHandler(async (req, res) => {
  const idUser = req.user.id;
  const { productId } = req.params;

  const { point, content } = req.body;

  let message = "";

  const myReview = await Review.findOne({
    where: {
      productId,
      userId: idUser,
    },
  });

  if (myReview) {
    await Review.update(
      {
        point: point || myReview.point,
        content: content || myReview.content,
      },
      {
        where: {
          id: myReview.id,
        },
      }
    );
    message = "review Berhasil di update";
  } else {
    await Review.create({
      productId,
      userId: idUser,
      point,
      content,
    });
    message = "review berhasil di buat";
  }

  return res.status(200).json({
    message,
  });
});

module.exports = { createOrUpdateReview };
