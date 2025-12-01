const minioClient = require("../../../inits/minio.inits").getS3();

class MediaModels {
  async listObjectsV2(params) {
    return minioClient.listObjectsV2(params).promise();
  }

  async getSignedUrl(params) {
    return minioClient.getSignedUrlPromise("getObject", params);
  }

  async putObject(params) {
    return minioClient.putObject(params).promise();
  }

  async deleteObject(params) {
    return minioClient.deleteObject(params).promise();
  }

  async deleteObjects(params) {
    return minioClient.deleteObjects(params).promise();
  }
}

module.exports = new MediaModels();
