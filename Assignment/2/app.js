const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: "./views/layouts",
    partialsDir: "./views/partials",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Routes
const indexRoutes = require("./routes/index");
const quizRoutes = require("./routes/quiz");
const questionRoutes = require("./routes/question");

app.use("/", indexRoutes);
app.use("/quizzes", quizRoutes);
app.use("/questions", questionRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
