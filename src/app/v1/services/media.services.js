const timeConstants = require("../../../constants/time.constants");
const { BadRequestResponse } = require("../../../cors/errorResponse.cors");
const BucketHelpers = require("../../../helpers/bucket.helper");
const MediaModels = require("../models/media.models");
class MediaServices {
  async listFiles(req) {
    const { bucket } = req.params;
    const { prefix } = req.query;

    if (!bucket) {
      throw new BadRequestResponse({
        message: "Bucket name is required",
      });
    }

    const params = {
      Bucket: bucket,
      MaxKeys: 100,
      Prefix: prefix || "",
    };

    const result = await MediaModels.listObjectsV2(params);

    // Trả về object với property objectName
    const files = result.Contents.map((item) => item.Key);

    return files;
  }

  async getSignedUrl(req) {
    const { objectName, expiresIn } = req.body;

    if (!objectName) {
      throw new BadRequestResponse({
        message: "bucketName and objectName are required in request body",
      });
    }

    const bucketName = BucketHelpers.getBucketNameFromPath(objectName);

    const params = {
      Bucket: bucketName,
      Key: objectName,
      ResponseCacheControl: "no-cache",
      Expires: expiresIn || timeConstants.ONE_HOUR,
    };

    const signedUrl = await MediaModels.getSignedUrl(params);
    return {
      bucketName,
      objectName,
      signedUrl,
      expiresIn: params.Expires,
    };
  }

  async getBulkSignedUrls(req) {
    const { objectNames, expiresIn } = req.body;

    if (!objectNames || objectNames.length === 0) {
      throw new BadRequestResponse({
        message: "objectNames are required in request body",
      });
    }

    const promises = objectNames.map(async (objectName) => {
      return await this.getSignedUrl({ body: { objectName, expiresIn } });
    });

    const signedUrls = await Promise.all(promises);
    return signedUrls;
  }

  async uploadFile(req) {
    const file = req.file;
    const { refId } = req.body;
    const { bucket } = req.params;

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
        message: "Bucket name is required",
      });
    }

    const { originalname, buffer, mimetype, size } = file;

    const bucketName = BucketHelpers.getBucketByName(bucket);

    const objectName = BucketHelpers.buildObjectName(
      bucketName,
      refId,
      originalname
    );

    const params = {
      Bucket: bucketName,
      Key: objectName,
      Body: buffer,
      ContentType: mimetype,
      ContentLength: size,
      Metadata: {
        originalname: "Class",
      },
    };
    await MediaModels.putObject(params);

    return {
      bucket: bucketName,
      objectName: objectName,
      originalname: originalname,
      mimetype: mimetype,
      size: size,
    };
  }

  async uploadFiles(req) {
    const files = req.files;

    if (!files || files.length === 0) {
      throw new BadRequestResponse({
        message: "No files uploaded",
      });
    }

    const promises = files?.map(async (file) => {
      return await this.uploadSingleFile({ ...req, file });
    });

    const uploadedFiles = await Promise.all(promises);
    return uploadedFiles;
  }

  async deleteFile(req) {
    const { bucketName, objectName } = req.body;

    if (!bucketName || !objectName) {
      throw new BadRequestResponse({
        message: "bucketName and objectName are required in request body",
      });
    }

    const params = {
      Bucket: bucketName,
      Key: objectName,
    };

    return await MediaModels.deleteObject(params);
  }

  async deleteFiles(req) {
    const { bucketName, objectNames } = req.body;

    if (!bucketName || !objectNames || objectNames.length === 0) {
      throw new BadRequestResponse({
        message: "bucketName and objectNames are required in request body",
      });
    }

    const objects = objectNames.map((name) => ({
      Key: name,
    }));

    const params = {
      Bucket: bucketName,
      Delete: {
        Objects: objects,
        Quiet: false,
      },
    };

    return await MediaModels.deleteObjects(params);
  }
}
module.exports = new MediaServices();
