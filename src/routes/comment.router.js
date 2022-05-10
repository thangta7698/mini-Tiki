const { Router } = require("express");
const { USER } = require("../configs/constants");
const CommentControllers = require("../controllers/comment/index");
const auth = require("../middlewares/auth");
const commentRouter = Router();

commentRouter.get("/:product_id", auth(USER), CommentControllers.queryComments);

commentRouter.post("/", auth(USER), CommentControllers.createComment);

module.exports = commentRouter;
