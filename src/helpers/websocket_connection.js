const { WebSocketServer } = require("ws");
const { wsConnectionName } = require("../configs/constants");
const routeConfig = require("../configs/ws_routes");
const NotificationWsHandler = require("../websockets/notification");
const { routeMatcher } = require("./ws_routes_parser");

const createSocketConnections = (server) => {
  const socketServer = new WebSocketServer({ server });
  const clients = {};

  socketServer.on("connection", (ws, request) => {
    const { url } = request;
    const { module, args } = routeMatcher(url, routeConfig);

    switch (module) {
      case wsConnectionName.NOTIFICATION: {
        clients[`NOTIFICATION_${args[0]}`] = ws;

        const notificationWsHandler = new NotificationWsHandler(ws, clients, args[0]);
        
        notificationWsHandler.initilize();
        ws.on("close", () => {
          delete clients[args[0]];
        });

        break;
      }

      default:
        break;
    }
  });
};

module.exports = createSocketConnections;
