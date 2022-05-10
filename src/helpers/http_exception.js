class HttpException extends Error {
  status;
  message;
  data;
  constructor(status, message, data) {
    super(message);
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

module.exports = HttpException;
