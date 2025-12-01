const { Ok } = require("../../../cors/successResponse.cors");
const MediaServices = require("../services/media.services");

class MediaControllers {
  async listFiles(req, res) {
    new Ok({
      metadata: await MediaServices.listFiles(req),
    }).send(res);
  }

  async getSignedUrl(req, res) {
    new Ok({
      metadata: await MediaServices.getSignedUrl(req),
    }).send(res);
  }

  async getBulkSignedUrls(req, res) {
    new Ok({
      metadata: await MediaServices.getBulkSignedUrls(req),
    }).send(res);
  }

  async uploadFile(req, res) {
    new Ok({
      metadata: await MediaServices.uploadFile(req),
    }).send(res);
  }

  async uploadFiles(req, res) {
    new Ok({
      metadata: await MediaServices.uploadFiles(req),
    }).send(res);
  }

  async deleteFile(req, res) {
    new Ok({
      metadata: await MediaServices.deleteFile(req),
    }).send(res);
  }

  async deleteFiles(req, res) {
    new Ok({
      metadata: await MediaServices.deleteFiles(req),
    }).send(res);
  }
}

module.exports = new MediaControllers();
