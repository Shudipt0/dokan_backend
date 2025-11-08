const multer = require("multer");
const path = require("path");
const fs = require("fs");

function uploader(
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_msg
) {
  // file upload folders
  const UPLOAD_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}`;

    // ✅ Ensure directory exists
  fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });

  // difine storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName = file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-");
      cb(null, fileName + fileExt);
    },
  });

  // prepare the final multer upload
  const upload = multer({
    storage: storage,
    limits: { fileSize: max_file_size },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(error_msg));
      }
    },
  });

  return upload;
}

module.exports = uploader;
