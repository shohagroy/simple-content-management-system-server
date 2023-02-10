const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { createToken } = require("./middlewares/createToken");

const port = process.env.POST || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// const uri = process.env.REACT_APP_DB_URI;
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    // database collections
    const usersCollection = client.db("blogxton").collection("users");
    const postsCollection = client.db("blogxton").collection("postsCollection");
    const commentsCollection = client
      .db("blogxton")
      .collection("commentsCollection");
    const notificationCollections = client
      .db("blogxton")
      .collection("allNotifications");

    // createUser
    app.post("/create-user", createToken, async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      res.send({ token: req.token });
    });

    // blog publish
    app.post("/create-blog", (req, res) => {
      console.log(req.body);
    });
  } finally {
  }
};
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Simple Contant Management System - Server is Running");
});

app.listen(port, () => {
  console.log(
    `Simple Contant Management System - Server is Running port: ${port}`
  );
});
