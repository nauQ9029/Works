const express = require("express");
const app = express();
const PORT = 8080;
const articleRouter = require("./routers/articleRouters");
const videoRouter = require("./routers/videoRouters");

app.use(express.json());

app.use("/articles", articleRouter);
app.use("/videos", videoRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
