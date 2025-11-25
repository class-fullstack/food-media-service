const { BadRequestResponse } = require("../../../cors/errorResponse.cors");
const BucketHelpers = require("../../../helpers/bucket.helper");

class MediaServices {
  async uploadSingleFile(req) {
    const file = req.file;
    const { bucket } = req.params;
    const { refId } = req.body;

    if (!file) {
      throw new BadRequestResponse({
        message: "No file uploaded",
      });
    }
    if (!refId) {
      throw new BadRequestResponse({
        message: "refId is required in request body",
      });
    }

    if (!bucket) {
      throw new BadRequestResponse({
        message: "bucket parameter is required",
      });
    }

    const { originalname, buffer, mimetype, size } = file;

    const bucketName = BucketHelpers.getBucketByName(bucket);

    const objectName = BucketHelpers.buildObjectName(
      bucketName,
      refId,
      originalname
    );

    return objectName;
  }
}
module.exports = new MediaServices();
