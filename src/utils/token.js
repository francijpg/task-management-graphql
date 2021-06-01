const jwt = require("jsonwebtoken");
const { session } = require("../constants");
require("dotenv").config(".env");

const createToken = (user) => {
  const { id, email, name } = user;
  const secret = process.env.SECRET_KEY;
  const expiresIn = session.TOKEN_DURATION_TIME;
  return jwt.sign({ id, email, name }, secret, { expiresIn });
};

const validateToken = (req) => {
  const token = req.headers["authorization"] || "";
  if (token) {
    try {
      const user = jwt.verify(token, process.env.SECRET_KEY);
      return {
        user,
      };
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = {
  validateToken,
  createToken,
};
