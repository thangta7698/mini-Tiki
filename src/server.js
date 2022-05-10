const dotenv = require('dotenv');

const express = require("express");
const database = require("./configs/database");
const createServer = require("./helpers/create_server");
const Logger = require("./helpers/logger");
const createSocketConnections = require("./helpers/websocket_connection");
const applyMiddlewares = require("./middlewares");
const errorHandler = require("./middlewares/error_handler");
const routes = require("./routes");
dotenv.config();
database.connect();

const PORT = process.env.PORT || 8080;

function lauchServer(port) {
  const app = express();
  applyMiddlewares(app);
  routes(app);
  app.use(errorHandler);

  const server = createServer(app);

  server.listen(port, () => {
    Logger.info(`App is listening at ${port}`);
  });
  createSocketConnections(server);
}

lauchServer(Number(PORT));

module.exports = lauchServer;
