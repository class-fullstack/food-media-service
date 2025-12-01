const AppHelpers = require("../helpers/app.helpers");

const Dev = {
  S3: {
    Endpoint: process.env.S3_ENDPOINT,
    AccessKeyId: process.env.S3_ACCESS_KEY_ID,
    SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    SslEnabled: process.env.S3_SSL_ENABLED,
  },
};

const Prod = {
  S3: {
    Endpoint: process.env.S3_ENDPOINT,
    AccessKeyId: process.env.S3_ACCESS_KEY_ID,
    SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    SslEnabled: process.env.S3_SSL_ENABLED,
  },
};

const Config = {
  Dev,
  Prod,
};

const env = process.env.APP_ENV;

module.exports = AppHelpers.getConfig(env, Config);
