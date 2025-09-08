const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// config for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can upload only image files!"), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFileFilter });
const uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());
uploadRouter
  .route("/")
  .get(async (req, res, next) => {
    res.statusCode = 403;
    res.end("GET opertaion nto supported on /imageUpload");
  })
  .post(upload.single("imageFile"), async (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(req.file);
  })
  .put(async (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /imageUpload");
  })
  .delete(async (req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /imageUpload");
  });

const downloadRouter = express.Router();
downloadRouter.route("/").get(async (req, res, next) => {
  const filePath = req.query.filePath; // Get the file path from query parameter
  const safePath = path.resolve("./public/images", filePath); // Ensure the path is within public/images
  console.log("path " + safePath);

  // Check if the requested file is within the 'public/images' directory to prevent directory traversal
  if (safePath.startsWith(path.resolve("public/images"))) {
    console.log(safePath);

    fs.exists(safePath, (exists) => {
      if (!exists) {
        return res.status(404).send({ message: "File does not exist." });
      }

      res.download(safePath, (err) => {
        if (err) {
          console.error("Download error: ", err); // Logging the error might give more clues
          return res
            .status(500)
            .send({ message: "Could not download the file." });
        }
      });
    });
  } else {
    res.status(403).send({ message: "Invalid file path." });
  }
});

module.exports = { uploadRouter, downloadRouter };
