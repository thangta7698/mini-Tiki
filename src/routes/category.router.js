const { Router } = require("express");
const { ADMIN } = require("../configs/constants");
const CategoryControllers = require("../controllers/category/index");
const auth = require("../middlewares/auth");
const categoryRouter = Router();

categoryRouter.get("/", CategoryControllers.queryCategories);

categoryRouter.delete("/:_id", auth(ADMIN), CategoryControllers.removeCategory);
categoryRouter.put("/:_id", auth(ADMIN), CategoryControllers.updateCategory);
categoryRouter.post("/", auth(ADMIN), CategoryControllers.createCategory);

module.exports = categoryRouter;
