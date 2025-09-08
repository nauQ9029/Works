const express = require("express");
const app = express();
const PORT = 8080;
const videos = require("./db.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET all videos
app.get("/videos", (req, res) => {
  res.status(200).json(videos);
});

// GET video by ID
app.get("/videos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const video = videos.find((v) => v.id === id);
  if (!video) return res.status(404).send("Video not found");
  res.status(200).json(video);
});

// POST new video
app.post("/videos", (req, res) => {
  const newVideo = {
    id: videos.length + 1,
    title: req.body.title,
    date: req.body.date,
    author: req.body.author,
    video: req.body.video,
    content: req.body.content,
    comments: req.body.comments || [],
  };
  videos.push(newVideo);
  res.status(201).json(newVideo);
});

// PUT update video by ID
app.put("/videos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = videos.findIndex((v) => v.id === id);
  if (index === -1) return res.status(404).send("Video not found");
  videos[index] = { ...videos[index], ...req.body };
  res.status(200).json(videos[index]);
});

// DELETE video by ID
app.delete("/videos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = videos.findIndex((v) => v.id === id);
  if (index === -1) return res.status(404).send("Video not found");
  const deleted = videos.splice(index, 1);
  res.status(200).json(deleted[0]);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
