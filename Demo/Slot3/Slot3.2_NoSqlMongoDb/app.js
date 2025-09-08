const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const User = require("./models/User");

const app = express();
app.use(bodyParser.json());

const url = "mongodb://localhost:27017";
const dbName = "testConnection";
let db;

// Kết nối MongoDB
MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to MongoDB");
    db = client.db(dbName);
  })
  .catch((err) => console.error(err));

// Routes
app.post("/users", async (req, res) => {
  const result = await db.collection("users").insertOne(req.body);
  res.status(201).json(result);
});

app.get("/users", async (req, res) => {
  const users = await db.collection("users").find().toArray();
  res.json(users);
});

app.listen(3000, () =>
  console.log("Server is running at http://localhost:3000")
);
