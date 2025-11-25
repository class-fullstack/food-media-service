const appConstants = require("../constants/app.constants");
class AppHelpers {
  static getConfig(env, config) {
    if (env === appConstants.APP_ENVS[0]) return config.Dev;
    if (env === appConstants.APP_ENVS[1]) return config.Prod;
    return null;
  }

  static getAppEnv() {
    return process.env.APP_ENV === appConstants.APP_ENVS[0]
      ? appConstants.APP_ENVS[0]
      : appConstants.APP_ENVS[1];
  }
}
module.exports = AppHelpers;
