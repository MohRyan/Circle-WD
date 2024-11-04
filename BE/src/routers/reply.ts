import { Router } from "express";
import * as threadsController from "../controllers/threadsController";
import { upload } from "../middlewares/uploads";
import authentication from "../middlewares/authentication";

const replyRouter = Router()

replyRouter.get("/all/:threadId", threadsController.replyAll)
replyRouter.get("/:threadId", threadsController.replyByThreadId)
replyRouter.post("/:threadsId", upload.any(), authentication, threadsController.replyCreate)
// replyRouter.delete("/:threadId", threadsController.threadsDelete)
// replyRouter.patch("/:threadId", threadsController.threadsEdit)

export default replyRouter