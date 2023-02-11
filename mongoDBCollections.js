const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// const uri = process.env.REACT_APP_DB_URI;
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// database collections
const usersCollection = client.db("blogxton").collection("users");
const postsCollection = client.db("blogxton").collection("postsCollection");
const commentsCollection = client
  .db("blogxton")
  .collection("commentsCollection");
const notificationCollections = client
  .db("blogxton")
  .collection("allNotifications");

module.exports = {
  usersCollection,
  postsCollection,
  ObjectId,
  commentsCollection,
};
