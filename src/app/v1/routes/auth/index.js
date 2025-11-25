const express = require("express");
const asyncHandlerUtils = require("../../../../utils/asyncHandler.utils");
const authControllers = require("../../controllers/auth.controllers");
const AuthMiddlewares = require("../../../../middlewares/auth.middlewares");
const router = express.Router();

//* Method: POST
/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               full_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post(
  "/register/user",
  AuthMiddlewares.verifyAccessToken,
  asyncHandlerUtils(authControllers.registerUser)
);

module.exports = router;
