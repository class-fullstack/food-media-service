const appConstants = require("../constants/app.constants");
const AppHelpers = require("../helpers/app.helpers");

const Dev = {
  App: {
    Port: process.env.APP_PORT || appConstants.APP_PORT,
    AppEnvs: process.env.APP_ENV || appConstants.APP_ENVS[0],
  },
};

const Prod = {
  App: {
    Port: process.env.APP_PORT || appConstants.APP_PORT,
    AppEnvs: process.env.APP_ENV || appConstants.APP_ENVS[1],
  },
};

const Config = {
  Dev,
  Prod,
};

const env = process.env.APP_ENV;

module.exports = AppHelpers.getConfig(env, Config);
