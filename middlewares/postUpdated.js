const { ObjectId } = require("mongodb");
const { postsCollection } = require("../mongoDBCollections");

const postUpdated = async (req, res, next) => {
  const postData = req.body;

  const query = {
    _id: new ObjectId(postData._id),
  };

  console.log(postData);

  const updatePost = await postsCollection.findOne(query);

  console.log(updatePost);

  const options = { upsert: true };

  const updateDoc = {
    $set: {
      blogName: postData.blogName,
      blogText: postData.blogName,
      image: postData.image,
      tags: postData.tags,
    },
  };
  const updated = await postsCollection.updateOne(query, updateDoc, options);

  if (updated.modifiedCount) {
    req.result = updated;
    next();
  }
};

module.exports = {
  postUpdated,
};
