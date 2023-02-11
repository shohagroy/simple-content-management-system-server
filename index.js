const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { createToken } = require("./middlewares/createToken");
const {
  usersCollection,
  postsCollection,
  commentsCollection,
} = require("./mongoDBCollections");
const { verifyedUser } = require("./middlewares/verifyedUser");
const { ObjectId } = require("mongodb");
const { updatePostView } = require("./middlewares/postViewerUpdate");
const { publicCommentUpdate } = require("./middlewares/publicCommentUpdate");
// const {  } = require("");

const port = process.env.POST || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const run = async () => {
  try {
    // createUser
    app.post("/create-user", createToken, async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      res.send({ token: req.token });
    });

    // blog publish
    app.post("/create-blog", verifyedUser, async (req, res) => {
      const newPost = req.body;
      const result = await postsCollection.insertOne(newPost);
      console.log(result);
      res.send(result);
    });

    // get all post
    app.get("/all-post", async (req, res) => {
      const query = {};
      const result = await postsCollection.find(query).toArray();
      res.send(result);
    });

    // get single post search by id
    app.get("/blog/:id", updatePostView, async (req, res) => {
      res.send(req.result);
    });
    app.post("/postComment", publicCommentUpdate, async (req, res) => {
      console.log(req.result);
      res.send(req.result);
    });
    app.get("/postComments", async (req, res) => {
      const postId = req.query.id;
      const query = { postId: postId };
      const result = await commentsCollection.find(query).toArray();
      res.send(result);
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
