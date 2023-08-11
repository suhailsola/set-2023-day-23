import { Router } from "express";

import uploadImage from "../middleware/upload/image";
import File from "../database/model/File";


const uploadRoutes = Router();

uploadRoutes.post(
  "/profile-picture",
  //   image validator
  uploadImage.single("profile-picture"),

  async function (req, res) {
    try {
      console.log(req.file);
      await File.create({
        ...req.file,
        path: req.file.path.replace("public\\", ""),
        created_by: 1,
      });
      res.status(200).json({ file: "image", data: req.file });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

uploadRoutes.post("/resume", function (req, res) {
  res.status(200).json({ file: "resume" });
});

export default uploadRoutes;
