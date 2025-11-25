const {
  UnauthorizedResponse,
  InternalServerErrorResponse,
} = require("../cors/errorResponse.cors");

class AuthMiddlewares {
  verifyAccessToken(req, __, next) {
    try {
      const token = req.headers["authorization"];
      if (!token) {
        next(new UnauthorizedResponse());
      }
      return next();
    } catch (error) {
      return next(new InternalServerErrorResponse());
    }
  }
}

module.exports = new AuthMiddlewares();
