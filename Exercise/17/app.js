const express = require("express");
const app = express();
const mongoose = require("mongoose");
const articleRouter = require("./routes/articleRouter");
mongoose.set("strictQuery", true);

const PORT = 8080;
const URL = "mongodb://localhost:27017/newspapers";

app.use(express.json());
app.use("/", articleRouter);

mongoose
  .connect(URL || "mongodb://localhost:27017/newspapers")
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("Using DB:", mongoose.connection.name);
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
