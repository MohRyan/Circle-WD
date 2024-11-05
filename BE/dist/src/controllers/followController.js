"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFollowStatus = exports.followCreate = exports.followerAll = exports.followingAll = void 0;
const followServices = __importStar(require("../services/followServices"));
const db_1 = __importDefault(require("../lib/db"));
const followingAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId.id;
        // const { followingId } = req.params
        const dataUser = yield followServices.followingAll(userId);
        res.status(200).json(dataUser);
    }
    catch (error) {
        console.log("🚀 ~ getUser ~ error:", error);
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.followingAll = followingAll;
const followerAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId.id;
        // const { followingId } = req.params
        const dataUser = yield followServices.followerAll(userId);
        res.status(200).json(dataUser);
    }
    catch (error) {
        console.log("🚀 ~ getUser ~ error:", error);
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.followerAll = followerAll;
const followCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId.id;
        const { followingId } = req.body;
        const dataUser = yield followServices.followCreate(userId, followingId);
        res.status(200).json(dataUser);
    }
    catch (error) {
        console.log("🚀 ~ getUser ~ error:", error);
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.followCreate = followCreate;
const checkFollowStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId.id;
        const { followingId } = req.params;
        const isFollowings = yield db_1.default.follow.findFirst({
            where: {
                followerId: followingId,
                followingId: userId
            },
        });
        //    console.log(isFollowings);
        res.json({
            success: true,
            message: "success",
            data: isFollowings ? true : false,
        });
    }
    catch (error) {
        const err = error;
        console.log(err);
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
exports.checkFollowStatus = checkFollowStatus;
