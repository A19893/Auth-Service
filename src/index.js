const express = require("express");
const { PORT } = require("./config/serverConfig");
const setupAndStartServer = async () => {
  const app = express();
  app.use(express.json({ limit: "50mb", extended: true }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.use('/api', require('./routes'));

  app.listen(PORT, async function () {
    console.clear();
    console.log(`Server listening on port ${PORT}`);
  });
};

setupAndStartServer();
