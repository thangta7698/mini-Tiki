const { Router } = require("express");
const { ADMIN, USER } = require("../configs/constants");
const OrderItemControllers = require("../controllers/order-item");
const auth = require("../middlewares/auth");
const orderItemRouter = Router();

orderItemRouter.get("/", auth(ADMIN), OrderItemControllers.queryOrderItems);
orderItemRouter.post("/", auth(USER), OrderItemControllers.createOrderItems);
orderItemRouter.delete("/", auth(ADMIN), OrderItemControllers.removeOrderItems);

module.exports = orderItemRouter;
