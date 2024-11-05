"use strict";
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
exports.likeCreate = exports.getCurrentLike = exports.likeAll = void 0;
const db_1 = __importDefault(require("../lib/db"));
const likeAll = (threadsId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.like.findMany({
        where: {
            threadId: threadsId,
        },
        include: {
            user: {
                select: {
                    username: true,
                    fullname: true,
                    id: true,
                    profile: {
                        select: {
                            avatar: true,
                        },
                    },
                },
            },
        },
    });
});
exports.likeAll = likeAll;
const getCurrentLike = (threadId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.like.findFirst({
        where: {
            threadId,
            userId,
        },
    });
});
exports.getCurrentLike = getCurrentLike;
const likeCreate = (userId, threadsId) => __awaiter(void 0, void 0, void 0, function* () {
    const existedLike = yield db_1.default.like.findFirst({
        where: {
            userId: userId,
            threadId: threadsId
        },
    });
    if (existedLike) {
        yield db_1.default.like.deleteMany({
            where: {
                userId: userId,
                threadId: threadsId
            },
        });
        return {
            message: "Unlike Successs"
        };
    }
    return yield db_1.default.like.create({
        data: {
            userId: userId,
            threadId: threadsId
        },
    });
});
exports.likeCreate = likeCreate;
