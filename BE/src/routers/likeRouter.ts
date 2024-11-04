import { Router } from "express";
import authentication from "../middlewares/authentication";
import * as likeController from "../controllers/likeController"

const likeRouter = Router()

likeRouter.get("/:threadsId", authentication, likeController.likeAll)
likeRouter.get("/check/:threadId", authentication, likeController.getCurrentLike);
likeRouter.post("/", authentication, likeController.likeCreate)
likeRouter.delete("/")

export default likeRouter