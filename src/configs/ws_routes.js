const { wsConnectionName } = require("./constants");

const routeConfig = {
  "/notification/:user_id": wsConnectionName.NOTIFICATION,
};

module.exports = routeConfig;
