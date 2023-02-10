const jwt = require("jsonwebtoken");
const { usersCollection } = require("../mongoDBCollections");

const verifyedUser = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const secret = process.env.REACT_APP_JWT_SECRET_ACCESS_TOKEN;

  if (!bearerToken) {
    return res.status(401).send({ massege: "unauthorized access" });
  }
  const jwtToken = bearerToken.split(" ")[1];

  jwt.verify(jwtToken, secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ massege: "unauthorized access" });
    } else {
      const query = {};
      const user = await usersCollection.findOne(query);

      if (user.name !== req.body.author) {
        return res.status(401).send({ massege: "unauthorized access" });
      } else {
        next();
      }
    }
  });
};

module.exports = {
  verifyedUser,
};
