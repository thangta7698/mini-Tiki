const jwt = require("jsonwebtoken");
const { USER } = require("../configs/constants");
const HttpException = require("../helpers/http_exception");
const verifyToken = require("../helpers/verify_token");

function auth(role = USER) {
  return (req, res, next) => {
    if (!req.headers?.authorization)
      return next(new HttpException(401, "Access denied!"));

    const token = req.headers.authorization.split(" ")[1];
    const verifiedData = verifyToken(token);

    if (!verifiedData || verifiedData.role > role)
      return next(new HttpException(401, "Access denied!"));

    req.user = verifiedData;
    next();
  };
}

module.exports = auth;
