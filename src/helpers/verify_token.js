const jwt = require("jsonwebtoken");
const Logger = require("./logger");

const verifyToken = (token) => {
  try {
    if (!token) return null;

    const verifiedData = jwt.verify(token, process.env.JWT_KEY);
    if (!verifiedData) return null;

    return verifiedData;
  } catch (error) {
    Logger.warn(error.message);
  }
};

module.exports = verifyToken