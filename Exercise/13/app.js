var createError = require("http-errors");
var express = require("express");
var path = require("path");

var app = express();

const { MongoClient } = require("mongodb");
const dboper = require("./operations");
const url = "mongodb://localhost:27017/";
const dbname = "newspapers";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

async function main() {
  const client = await MongoClient.connect(url);
  console.log(" >>> [DEBUG] Connected to the database successfully");
  const db = client.db(dbname);

  try {
    const insertResult = await dboper.insertDocument(
      db,
      { title: "Exploring the Hidden Gems of Paris", auther: "Jane Doe" },
      "articles"
    );
    let docs = await dboper.findDocuments(db, "articles");
    console.log("Found documents:\n", docs);

    const updateResult = await dboper.updateDocument(
      db,
      { title: "Exploring the Hidden Gems of Paris" },
      { content: "Paris is known for its..." },
      "articles"
    );
    console.log("Found updated documents:\n", docs);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main().catch(console.error);
