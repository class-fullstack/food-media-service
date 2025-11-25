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

//* Auth Routes
router.use("/auth", require("./auth"));

module.exports = router;
