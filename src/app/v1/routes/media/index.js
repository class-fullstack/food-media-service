const express = require("express");
const asyncHandlerUtils = require("../../../../utils/asyncHandler.utils");
const mediaControllers = require("../../controllers/media.controllers");
const AuthMiddlewares = require("../../../../middlewares/auth.middlewares");
const MulterUpload = require("../../../../helpers/multer.helpers");
const router = express.Router();

//* Method: POST
router.post(
  "/upload/:bucket",
  AuthMiddlewares.verifyAccessToken,
  MulterUpload.single("file"),
  asyncHandlerUtils(mediaControllers.uploadSingleFile)
);

module.exports = router;
