const parseMessage = (message) => {
  const stringify = message.toString();

  try {
    const json = JSON.parse(stringify);

    return json;
  } catch (err) {
    return stringify;
  }
};

module.exports = parseMessage;
