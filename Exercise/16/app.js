const express = require("express");
const app = express();
const mongoose = require("mongoose");
const commentRouter = require("./routes/commentRouter");
mongoose.set("strictQuery", true);

const PORT = 8080;
const URL = "mongodb://localhost:27017/newspapers";
const connect = mongoose.connect(URL);

app.use(express.json());
// Comment router
app.use("/comments", commentRouter);

// MongoDB connection
mongoose
  .connect(URL || "mongodb://localhost:27017/newspapers", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});
