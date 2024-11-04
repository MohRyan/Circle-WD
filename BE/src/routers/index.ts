import { Router } from "express";
import userRouter from "./userRouter";
import authRouter from "./authRouter";
import threadsRouter from "./threadsRouter";
import likeRouter from "./likeRouter";
import followRouter from "./followRouter";
import replyRouter from "./reply";
import searchRouter from "./search";

const indexRouter = Router();

indexRouter.use(authRouter);
indexRouter.use("/user", userRouter);
indexRouter.use("/threads", threadsRouter);
indexRouter.use("/reply", replyRouter);
indexRouter.use("/like", likeRouter);
indexRouter.use("/follow", followRouter);
indexRouter.use("/search", searchRouter);

export default indexRouter;
