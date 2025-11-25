const { BadRequestResponse } = require("../../../cors/errorResponse.cors");

class AuthServices {
  async registerUser(userData) {
    // if (userData) {
    //   throw new BadRequestResponse();
    // }
    return { message: "User registered successfully", data: userData };
  }
}
module.exports = new AuthServices();
