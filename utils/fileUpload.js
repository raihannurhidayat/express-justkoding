const multer = require("multer");

const fileType = {
  "image/jpg": "jpg",
  "image/png": "png",
  "image/jpeg": "jpeg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValidation = fileType[file.mimetype];
    let uploadError = new Error("Invalid Format File");

    if (isValidation) {
      uploadError = null;
    }

    cb(uploadError, "public/uploads");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.split(" ").join("-");
    const ext = fileType[file.mimetype];

    const uniqueSuffix = `${file.fieldname}-${Date.now()}.${ext}`;

    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
