const AWS = require("aws-sdk");

const {
  S3: { Endpoint, AccessKeyId, SecretAccessKey, SslEnabled },
} = require("../configs/minio.configs");

class MinioClient {
  constructor() {
    this.s3 = new AWS.S3({
      endpoint: Endpoint,
      accessKeyId: AccessKeyId,
      secretAccessKey: SecretAccessKey,
      sslEnabled: SslEnabled,
      s3ForcePathStyle: true,
      signatureVersion: "v4",
    });
  }

  static getInstance() {
    if (!MinioClient.instance) {
      MinioClient.instance = new MinioClient();
    }
    return MinioClient.instance;
  }

  async testConnection() {
    try {
      await this.s3.listBuckets().promise();
      console.log("✅ Kết nối MinIO thành công!");
      return true;
    } catch (error) {
      console.error("❌ Lỗi kết nối MinIO:", error.message);
      return false;
    }
  }

  getS3() {
    return this.s3;
  }
}

module.exports = new MinioClient();
