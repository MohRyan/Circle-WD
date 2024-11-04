import { Router } from "express";
import authentication from "../middlewares/authentication";
import * as followController from "../controllers/followController"

const followRouter = Router()

followRouter.get("/following", authentication, followController.followingAll)
followRouter.get("/follower", authentication, followController.followerAll)
followRouter.get("/:followingId", authentication, followController.checkFollowStatus)
followRouter.post("/", authentication, followController.followCreate)
followRouter.delete("/")

export default followRouter