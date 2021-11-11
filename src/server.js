const express = require("express");
const app = express();

const setupExpressServer = () => {
  app.use(express.json());

  return app;
};

module.exports = { setupExpressServer };