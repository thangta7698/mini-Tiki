const { wsCommands, ERROR } = require('../configs/constants');
const parseMessage = require('../helpers/parse_ws_message');
const NotificationHandlers = require('../controllers/notification/handlers');
const Logger = require('../helpers/logger');
const UserHandlers = require('../controllers/user/handlers');
class NotificationWsHandler {
  constructor(ws, clients, userId) {
    this.ws = ws;
    this.clients = clients;
    this.userId = userId;
  }

  initilize() {
    this.ws.on('message', async (message) => {
      try {
        message = parseMessage(message);
        const command = message.type || message;
        const { payload } = message;

        switch (command) {
          case wsCommands.PUSH_MESSAGE: {
            const userInfo = await UserHandlers.getOneUser(this.userId);

            if (userInfo.response.data.role > 1)
              return this.ws.send('Access denied!');

            const result = await NotificationHandlers.createNotification({
              user_id: payload.user_id,
              content: payload.content,
            });

            if (result.status === ERROR)
              return this.ws.send(JSON.stringify(result.response));

            this.clients[`NOTIFICATION_${payload.user_id}`].send(
              JSON.stringify(payload.content)
            );
            break;
          }

          default:
            break;
        }
      } catch (error) {
        Logger.error(error.message);
      }
    });
  }
}

module.exports = NotificationWsHandler;
