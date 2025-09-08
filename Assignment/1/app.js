const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 3000;

const quizRoutes = require("./routes/quizRoutes");
const questionRoutes = require("./routes/questionRoutes");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

connectDB();

// app.use((req, res, next) => {
//   console.log("=== REQUEST DEBUG ===");
//   console.log(" >>>[DEBUG] Method:", req.method);
//   console.log(" >>>[DEBUG] MethodURL:", req.url);
//   console.log(" >>>[DEBUG] MethodContent-Type:", req.get("Content-Type"));
//   console.log(" >>>[DEBUG] MethodRaw Body:", req.body);
//   console.log(" >>>[DEBUG] MethodHeaders:", req.headers);
//   console.log("====================");
//   next();
// });

app.use("/quizzes", quizRoutes);
app.use("/questions", questionRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
