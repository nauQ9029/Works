var express = require("express");
const app = express();
const PORT = 8080;
const articleRouter = require("./routes/articleRouter");

app.use("/articles", articleRouter);

app.listen(PORT, () => {
  console.log(`Example app is listening at http://localhost:${PORT}`);
});