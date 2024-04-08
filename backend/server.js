const express = require("express");
const dotenv = require("dotenv").config();
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

//Database name
const dbName = "passop";
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

client.connect();

//Get all the passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.send(findResult);
});

//Save Password
app.post("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult });
});

//Delete a Password
app.delete("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  res.send({ success: true, result: findResult });
});
app.listen(port);
