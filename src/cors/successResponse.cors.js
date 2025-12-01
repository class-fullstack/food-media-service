const reasonParsesUtils = require("../utils/reasonPhrases.utils");
const statusCodesUtils = require("../utils/statusCodes.utils");

//* Base Success Response Class
class SuccessResponsesCors {
  constructor({ message, status, metadata = {} }) {
    this.message = message;
    this.status = status;
    this.timestamp = new Date().toISOString();
    this.metadata = metadata;
  }

  send(res) {
    return res.status(this.status).send(this);
  }
}

//* 200 OK
class Ok extends SuccessResponsesCors {
  constructor({
    message = reasonParsesUtils.OK,
    status = statusCodesUtils.OK,
    metadata = {},
    options = {},
  } = {}) {
    super({ message, status, metadata });
    this.options = options;
  }
}

//* 201 Created
class Created extends SuccessResponsesCors {
  constructor({
    message = reasonParsesUtils.CREATED,
    status = statusCodesUtils.CREATED,
    metadata = {},
  } = {}) {
    super({ message, status, metadata });
  }
}

module.exports = {
  Ok,
  Created,
};
