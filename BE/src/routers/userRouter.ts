import { Router } from "express";
import * as userController from "../controllers/userController";
import authentication from "../middlewares/authentication";
import { uploadMiddleware } from "../middlewares/uploads";

const userRouter = Router();

userRouter.get("/", userController.getAllUser);
userRouter.get("/suggest", authentication, userController.suggestUsers);
userRouter.get("/:userId", authentication, userController.getUser);
userRouter.post("/", userController.createUser);
userRouter.delete("/:userId", userController.deleteUser);
userRouter.put("/", uploadMiddleware("cover") || uploadMiddleware("avatar"), authentication, userController.updateProfileUser);

export default userRouter;
