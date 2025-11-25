const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const {
  errorHandlerUtils,
  notFoundHandlerUtils,
} = require("./utils/errorHandler.utils");
const AppHelpers = require("./helpers/app.helpers");
const appConstants = require("./constants/app.constants");
const v1Router = require("./app/v1/routes");
const { swaggerUi, swaggerSpec } = require("./app/v1/docs/swagger.docs");

const app = express();

//* Use Libraries
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(
  morgan(
    AppHelpers.getAppEnv() === appConstants.APP_ENVS[0]
      ? appConstants.MORGAN_FORMATS[0]
      : appConstants.MORGAN_FORMATS[1]
  )
);

//* Group Versions
const apiRouter = express.Router();

//* V1
apiRouter.use("/v1", v1Router);

//* Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//* Use API Router
app.use("/api", apiRouter);

//* Error Handlers
app.use(notFoundHandlerUtils);
app.use(errorHandlerUtils);

module.exports = app;
