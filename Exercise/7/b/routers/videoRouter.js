// routers/videoRouter.js
const express = require("express");
const videoRouter = express.Router();
const db = require("../data/db"); // import danh sách video
const videos = db.videos;         // ✅ trích riêng mảng videos

videoRouter.use(express.json());
videoRouter.use(express.urlencoded({ extended: true }));

// GET /videos - Trả về tất cả video
videoRouter.get("/", (req, res) => {
  res.status(200).json(videos);
});

// GET /videos/:id - Trả về 1 video theo id
videoRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const video = videos.find((v) => v.id === id);

  if (!video) {
    return res.status(404).send("Video not found");
  }

  res.status(200).json(video);
});

// POST /videos - Thêm video mới
videoRouter.post("/", (req, res) => {
  const { title, author, video: videoURL, content } = req.body;

  const newVideo = {
    id: videos.length + 1,
    title,
    author,
    video: videoURL,
    date: new Date().toISOString().split("T")[0],
    content,
    comments: [],
  };

  videos.push(newVideo);
  res.status(201).json(newVideo);
});

// DELETE /videos/:id - Xoá video theo id
videoRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = videos.findIndex((v) => v.id === id);

  if (index === -1) {
    return res.status(404).send("Video not found");
  }

  const deleted = videos.splice(index, 1);
  res.status(200).json(deleted[0]);
});

module.exports = videoRouter;
