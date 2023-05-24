const jwt = require("jsonwebtoken");
const config = require("config");

const authenticate = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send("Access denied (No token provided)");
  try {
    const decodedPayload = jwt.verify(token, process.env.jwtPrivateKey);
    req.user = decodedPayload;

    next();
  } catch (error) {
    res.status(400).send("Access denied. (Invalid token)");
  }
};

module.exports = authenticate;
