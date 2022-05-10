const { Router } = require("express");
const { USER } = require("../configs/constants");
const RatingControllers = require("../controllers/rating/index");
const auth = require("../middlewares/auth");
const ratingRouter = Router();

ratingRouter.get("/all", RatingControllers.queryAllRates);
ratingRouter.get("/", RatingControllers.queryRates);
ratingRouter.get("/bought", RatingControllers.getIsBought);
ratingRouter.post("/", auth(USER), RatingControllers.createRate);

module.exports = ratingRouter;
