const { ObjectId } = require("mongodb");
const { postsCollection } = require("../mongoDBCollections");

const updatePostView = async (req, res, next) => {
  const postId = req.params.id;
  const filter = {
    _id: new ObjectId(postId),
  };

  const updatePost = await postsCollection.findOne(filter);
  const postView = updatePost.view;
  const newView = parseInt(postView) + 1;

  const options = { upsert: true };
  const updateDoc = {
    $set: {
      view: newView,
    },
  };
  const updated = await postsCollection.updateOne(filter, updateDoc, options);

  if (updated.modifiedCount) {
    req.result = updatePost;
    next();
  }
};

module.exports = {
  updatePostView,
};
