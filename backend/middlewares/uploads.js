const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const nomeUnico = Date.now() + path.extname(file.originalname);

    cb(null, nomeUnico);
  },
});

module.exports = multer({ storage });
