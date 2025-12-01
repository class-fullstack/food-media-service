const express = require("express");
const asyncHandlerUtils = require("../../../../utils/asyncHandler.utils");
const mediaControllers = require("../../controllers/media.controllers");
const AuthMiddlewares = require("../../../../middlewares/auth.middlewares");
const MulterUpload = require("../../../../helpers/multer.helpers");
const limitConstants = require("../../../../constants/limit.constants");
const router = express.Router();

//* Method: GET
router.get(
  "/list/:bucket",
  AuthMiddlewares.verifyAccessToken,
  asyncHandlerUtils(mediaControllers.listFiles)
);

router.post(
  "/signed-url",
  AuthMiddlewares.verifyAccessToken,
  asyncHandlerUtils(mediaControllers.getSignedUrl)
);

router.post(
  "/signed-urls",
  AuthMiddlewares.verifyAccessToken,
  asyncHandlerUtils(mediaControllers.getBulkSignedUrls)
);

//* Method: POST
router.post(
  "/upload/:bucket",
  AuthMiddlewares.verifyAccessToken,
  MulterUpload.single("file"),
  asyncHandlerUtils(mediaControllers.uploadFile)
);

router.post(
  "/upload-multiple/:bucket",
  AuthMiddlewares.verifyAccessToken,
  MulterUpload.array("files", limitConstants.MAX_UPLOAD_FILES),
  asyncHandlerUtils(mediaControllers.uploadFiles)
);

router.post(
  "/delete",
  AuthMiddlewares.verifyAccessToken,
  asyncHandlerUtils(mediaControllers.deleteFile)
);

router.post(
  "/delete-multiple",
  AuthMiddlewares.verifyAccessToken,
  asyncHandlerUtils(mediaControllers.deleteFiles)
);

module.exports = router;
