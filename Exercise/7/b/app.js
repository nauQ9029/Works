const express = require("express");
const app = express();
const PORT = 8080;
const videoRouter = require("./routers/videoRouter");

app.use("/videos", videoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
