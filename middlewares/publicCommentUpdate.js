const { ObjectId } = require("mongodb");
const {
  commentsCollection,
  postsCollection,
} = require("../mongoDBCollections");

const publicCommentUpdate = async (req, res, next) => {
  const publicComment = req.body;
  const postId = publicComment.postId;
  const filter = {
    _id: new ObjectId(postId),
  };

  const updatePost = await postsCollection.findOne(filter);
  const postComment = updatePost.comment;
  const newComment = parseInt(postComment) + 1;

  const options = { upsert: true };
  const updateDoc = {
    $set: {
      comment: newComment,
    },
  };
  const updated = await postsCollection.updateOne(filter, updateDoc, options);

  if (updated.modifiedCount) {
    const result = await commentsCollection.insertOne(publicComment);
    req.result = result;
    next();
  }

  console.log(publicComment);
};

module.exports = {
  publicCommentUpdate,
};
