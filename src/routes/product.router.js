const { Router } = require("express");
const { ADMIN } = require("../configs/constants");
const ProductControllers = require("../controllers/product/index");
const auth = require("../middlewares/auth");
const productRouter = Router();

productRouter.get("/:slug", ProductControllers.getOneProduct);
productRouter.get("/", ProductControllers.queryProducts);

productRouter.delete("/:_id", auth(ADMIN), ProductControllers.removeProduct);
productRouter.put("/:_id", auth(ADMIN), ProductControllers.updateProduct);
productRouter.post("/", auth(ADMIN), ProductControllers.createProduct);

module.exports = productRouter;
