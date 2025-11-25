const { Ok } = require("../../../cors/sucessResponse.cors");
const MediaServices = require("../services/media.services");

class MediaControllers {
  async uploadSingleFile(req, res) {
    new Ok({
      metadata: await MediaServices.uploadSingleFile(req),
    }).send(res);
  }
}

module.exports = new MediaControllers();
