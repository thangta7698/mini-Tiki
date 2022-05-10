const { Router } = require("express");
const { ADMIN } = require("../configs/constants");
const BrandControllers = require("../controllers/brand/index");
const auth = require("../middlewares/auth");
const brandRouter = Router();

brandRouter.get("/", BrandControllers.queryBrands);

brandRouter.delete("/:_id", auth(ADMIN), BrandControllers.removeBrand);
brandRouter.put("/:_id", auth(ADMIN), BrandControllers.updateBrand);
brandRouter.post("/", auth(ADMIN), BrandControllers.createBrand);

module.exports = brandRouter;
