const reasonParsesUtils = require("../utils/reasonPhrases.utils");
const statusCodesUtils = require("../utils/statusCodes.utils");
const codeCustomUtils = require("../utils/codeCustom.utils");

//* Base Error Response Class
class ErrorResponseCors extends Error {
  constructor({ message, status, code }) {
    super(message);
    this.status = status;
    this.code = code;
    this.timestamp = new Date().toISOString();
  }
}

//* ------- 4xx Client Error Responses ------- //
//* 400 Bad Request
class BadRequestResponse extends ErrorResponseCors {
  constructor({
    message = reasonParsesUtils.BAD_REQUEST,
    status = statusCodesUtils.BAD_REQUEST,
    code = codeCustomUtils.BAD_REQUEST.code,
  } = {}) {
    super({ message, status, code });
  }
}

//* 401 Unauthorized
class UnauthorizedResponse extends ErrorResponseCors {
  constructor({
    message = reasonParsesUtils.UNAUTHORIZED,
    status = statusCodesUtils.UNAUTHORIZED,
    code = codeCustomUtils.UNAUTHORIZED.code,
  } = {}) {
    super({ message, status, code });
  }
}

//* 403 Forbidden
class ForbiddenResponse extends ErrorResponseCors {
  constructor({
    message = reasonParsesUtils.FORBIDDEN,
    status = statusCodesUtils.FORBIDDEN,
    code = codeCustomUtils.FORBIDDEN.code,
  } = {}) {
    super({ message, status, code });
  }
}

//* 404 Not Found
class NotFoundResponse extends ErrorResponseCors {
  constructor({
    message = reasonParsesUtils.NOT_FOUND,
    status = statusCodesUtils.NOT_FOUND,
    code = codeCustomUtils.NOT_FOUND.code,
  } = {}) {
    super({ message, status, code });
  }
}

//* ------- 5xx Server Error Responses ------- //
class InternalServerErrorResponse extends ErrorResponseCors {
  constructor({
    message = reasonParsesUtils.INTERNAL_SERVER_ERROR,
    status = statusCodesUtils.INTERNAL_SERVER_ERROR,
    code = codeCustomUtils.INTERNAL_SERVER_ERROR.code,
  } = {}) {
    super({ message, status, code });
  }
}

module.exports = {
  BadRequestResponse,
  NotFoundResponse,
  UnauthorizedResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
};
