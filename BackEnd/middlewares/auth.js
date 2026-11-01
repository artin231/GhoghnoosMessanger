require("dotenv").config();
const jwt = require("jsonwebtoken");

let auth = (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ error: "the token is invalid" });
  } else {
    try {
      let decode = jwt.verify(token, process.env.SECRET_KEY);
      req.userData = decode;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).send({ error: "the token is not correct" });
    }
  }
};

module.exports = auth;
