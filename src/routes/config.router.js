const { Router } = require("express");
const ConfigControllers = require("../controllers/config/index.js");
const configRouter = Router();

configRouter.get("/", ConfigControllers.queryConfig);
configRouter.put("/", ConfigControllers.updateConfig);

module.exports = configRouter;
