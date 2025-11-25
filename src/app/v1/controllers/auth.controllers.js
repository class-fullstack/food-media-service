const { Ok } = require("../../../cors/sucessResponse.cors");
const AuthServices = require("../services/auth.services");

class AuthControllers {
  async registerUser(req, res) {
    new Ok({
      metadata: await AuthServices.registerUser(req.body),
    }).send(res);
  }
}

module.exports = new AuthControllers();
