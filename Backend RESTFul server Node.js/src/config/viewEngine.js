const path = require("path");
const express = require("express");

const configViewEngine = (app) => {
  // Config template engine
  app.set("views", path.join("./src", "views"));
  app.set("view engine", "ejs");

  // Config static files: images, css, js
  // console.log(">>> [DEBUG] check static files: ", __dirname);
  app.use(express.static(path.join("./src", "public")));
};

module.exports = configViewEngine;
