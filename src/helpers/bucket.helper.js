const { nanoid } = require("nanoid");
const path = require("path");

const { BadRequestResponse } = require("../cors/errorResponse.cors");
const bucketConstants = require("../constants/bucket.constants");
const appConstants = require("../constants/app.constants");

class BucketHelpers {
  static getBucketByName(bucketName) {
    const buckets = Object.values(bucketConstants);

    const isValid = buckets.includes(bucketName);

    if (!isValid) {
      throw new BadRequestResponse({
        message: `Unsupported bucket name: ${bucketName}`,
      });
    }

    return bucketName;
  }

  static generateObjectId(size = 12) {
    return nanoid(size);
  }

  /**
   * Build object name for MinIO storage
   *
   * Format:
   *   <project>/<bucket>/<refId>/<objectId>_<filename>.<ext>
   */
  static buildObjectName(bucketName, refId, originalFilename) {
    const ext = path.extname(originalFilename);
    const base = path.basename(originalFilename, ext);

    const objectId = this.generateObjectId(12); // sinh 12 chars

    return `${appConstants.PROJECT_NAME}/${bucketName}/${refId}/${objectId}_${base}${ext}`;
  }

  static getBucketNameFromPath(input) {
    if (!input || typeof input !== "string") return null;

    let path = input;

    try {
      if (input.startsWith("http://") || input.startsWith("https://")) {
        const url = new URL(input);
        path = url.pathname; // e.g. "/ordering-media/food-order-users/123/..."
      }
    } catch (e) {
      // ignore URL parse error, fall back to raw string
    }

    const parts = path.split("/").filter(Boolean); // remove empty segments

    // [0] = "ordering-media"
    // [1] = "food-order-users"  <-- bucketName you want
    if (parts.length < 2) return null;

    return parts[1];
  }
}
module.exports = BucketHelpers;
