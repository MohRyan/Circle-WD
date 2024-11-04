import { Router } from "express";
import * as authController from "../controllers/authController";
import authentication from "../middlewares/authentication";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/checkToken", authentication, authController.checkToken);

export default authRouter;
