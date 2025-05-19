import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    let uploadPath = "uploads/";
    if (
      request.baseUrl.includes("auth") ||
      request.baseUrl.includes("dashboard")
    ) {
      uploadPath = "uploads/members/";
    } else if (request.baseUrl.includes("post")) {
      uploadPath = "uploads/posts/";
    }
    cb(null, uploadPath);
  },
  filename: function (request, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (request, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

export default upload;
