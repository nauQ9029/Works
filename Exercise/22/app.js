const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const articleRouter = require("./routes/articleRouter");
const userRouter = require("./routes/users");
const sessionConfig = require("./config/sessionConfig");

const app = express();
const PORT = 8080;
const URL = "mongodb://localhost:27017/newspapers";

mongoose.set("strictQuery", true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use("/articles", articleRouter);
app.use("/users", userRouter);

mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("Using DB:", mongoose.connection.name);
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
