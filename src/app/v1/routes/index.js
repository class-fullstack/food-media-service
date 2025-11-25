const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  return res.status(200).json(healthCheck);
});

//* Media Routes
router.use("/media", require("./media"));

module.exports = router;
