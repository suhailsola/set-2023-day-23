import multer from "multer";
import path from "path";
import File from "../../database/model/File";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const uploadImage = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const fileSize = parseInt(req.header["content-length"]);
    const maxSize = 1500000;
    const whitelistExt = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const whitelistMime = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (
      !whitelistExt.includes(extension) &&
      !whitelistMime.includes(file.mimetype)
    ) {
      req.uploadError = "Only jpeg, jpg, png, gif and webp are allowed";
      return cb(null, false);
    }

    if (fileSize > maxSize) {
      req.uploadError = "Max size for upload is 1.5MB";
      return cb(null, false);
    }
    cb(null, true);
  },
});

export function uploadError(req, res, next) {
  if (req.uploadError) {
    return res.status(403).json({ Error: req.uploadError });
  } else {
    next();
  }
}

export async function storeImage(req, res, next) {
  try {
    const storedFile = await File.create({
      ...req.file,
      path: req.file.path.replace("public", ""),
      created_by: 1,
    });
    req.file = storedFile;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Error mat", error });
  }
}

export default uploadImage;
