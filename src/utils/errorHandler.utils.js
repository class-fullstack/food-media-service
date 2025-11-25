const appConstants = require("../constants/app.constants");
const { NotFoundResponse } = require("../cors/errorResponse.cors");
const AppHelpers = require("../helpers/app.helpers");
const codeCustomUtils = require("./codeCustom.utils");
const reasonPhrasesUtils = require("./reasonPhrases.utils");
const statusCodesUtils = require("./statusCodes.utils");

const notFoundHandlerUtils = (_, __, next) => {
  const error = new NotFoundResponse();
  next(error);
};

const errorHandlerUtils = (error, __, res, ____) => {
  const statusCode = error.status || statusCodesUtils.INTERNAL_SERVER_ERROR;
  const errorCode = error.code || codeCustomUtils.INTERNAL_SERVER_ERROR.code;
  const errorMessage =
    error.message || reasonPhrasesUtils.INTERNAL_SERVER_ERROR;
  const errorTime = error.timestamp || new Date().getTime();

  const response = {
    status: statusCode,
    code: errorCode,
    message: errorMessage,
    timestamp: errorTime,
  };
  if (AppHelpers.getAppEnv() === appConstants.APP_ENVS[0]) {
    response.stack = error.stack;
  }

  return res.status(statusCode).json(response);
};

module.exports = {
  errorHandlerUtils,
  notFoundHandlerUtils,
};
