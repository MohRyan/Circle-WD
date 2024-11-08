"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter_1 = __importDefault(require("./userRouter"));
const authRouter_1 = __importDefault(require("./authRouter"));
const threadsRouter_1 = __importDefault(require("./threadsRouter"));
const likeRouter_1 = __importDefault(require("./likeRouter"));
const followRouter_1 = __importDefault(require("./followRouter"));
const reply_1 = __importDefault(require("./reply"));
const search_1 = __importDefault(require("./search"));
const indexRouter = (0, express_1.Router)();
indexRouter.use(authRouter_1.default);
indexRouter.use("/user", userRouter_1.default);
indexRouter.use("/threads", threadsRouter_1.default);
indexRouter.use("/reply", reply_1.default);
indexRouter.use("/like", likeRouter_1.default);
indexRouter.use("/follow", followRouter_1.default);
indexRouter.use("/search", search_1.default);
exports.default = indexRouter;
