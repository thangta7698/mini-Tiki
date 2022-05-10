const http = require("http");

const createServer = (app) => {
  const httpServer = new http.Server(app);

  return httpServer;
};

module.exports = createServer;
