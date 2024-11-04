import { Router } from "express";
import * as threadsController from "../controllers/threadsController";
import { upload } from "../middlewares/uploads";
import authentication from "../middlewares/authentication";

const threadsRouter = Router()

threadsRouter.get("/", threadsController.threadsAll)
threadsRouter.get("/userLogin", authentication, threadsController.threadsAllbyUserLogin)
threadsRouter.get("/:userId", threadsController.threadsAllByUserId)
threadsRouter.get("/detail/:threadId", threadsController.threadsOneById)
threadsRouter.post("/", upload.any(), authentication, threadsController.threadsCreate)
threadsRouter.delete("/:threadId", threadsController.threadsDelete)
threadsRouter.patch("/:threadId", threadsController.threadsEdit)

export default threadsRouter