const { Router } = require("express");
const { ADMIN } = require("../configs/constants");
const ProductImageControllers = require("../controllers/image/index");
const auth = require("../middlewares/auth");
const productImageRouter = Router();

productImageRouter.delete(
  "/delete",
  auth(ADMIN),
  ProductImageControllers.removeProductImage
);

productImageRouter.get("/", ProductImageControllers.getProductImages);

productImageRouter.post(
  "/",
  auth(ADMIN),
  ProductImageControllers.createProductImage
);

module.exports = productImageRouter;
