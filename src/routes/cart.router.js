const { Router } = require("express");
const { USER } = require("../configs/constants");
const CartControllers = require("../controllers/cart");
const auth = require("../middlewares/auth");
const cartRouter = Router();

cartRouter.get("/", auth(USER), CartControllers.queryCart);
cartRouter.post("/", auth(USER), CartControllers.addToCart);
cartRouter.put("/:_id", auth(USER), CartControllers.updateCartItem);
cartRouter.delete("/", auth(USER), CartControllers.removeCartItems);

module.exports = cartRouter;
