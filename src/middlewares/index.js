const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const applyMiddlewares = (app) => {
  app.use(cors({ credentials: true, origin: "*" }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
};

module.exports = applyMiddlewares;
