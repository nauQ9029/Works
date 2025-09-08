require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");

// Check if the environment variables are loaded
// console.log('>>> check env: ', process.env)
const app = express();
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME;

// Config template engine
configViewEngine(app);

// Define routes
app.use("/", webRoutes);  // Default route, URL path will follow this pattern: http://localhost:3000/
app.use("/v1", webRoutes);  // Defined route, URL path will follow this pattern: http://localhost:3000/v1/


app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
