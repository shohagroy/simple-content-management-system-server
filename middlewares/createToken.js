const jwt = require("jsonwebtoken");

const secret = process.env.REACT_APP_JWT_SECRET_ACCESS_TOKEN;

const createToken = async (req, res, next) => {
  const userInfo = req.body;
  const userEmail = { email: userInfo.email };
  const jwtToken = jwt.sign(userEmail, secret, { expiresIn: "10h" });

  req.token = jwtToken;
  next();
};

module.exports = {
  createToken,
};
