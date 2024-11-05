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
exports.followCreate = exports.followerAll = exports.followingAll = void 0;
const db_1 = __importDefault(require("../lib/db"));
const followingAll = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const searchFollowing = yield db_1.default.follow.findMany({
        where: {
            followingId: userId
        },
        select: {
            follower: {
                select: {
                    id: true,
                    username: true,
                    fullname: true,
                    profile: {
                        select: {
                            avatar: true
                        }
                    }
                }
            }
        }
    });
    return searchFollowing;
});
exports.followingAll = followingAll;
const followerAll = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const searchFollower = yield db_1.default.follow.findMany({
        where: {
            followerId: userId
        },
        select: {
            following: {
                select: {
                    id: true,
                    username: true,
                    fullname: true,
                    profile: {
                        select: {
                            avatar: true
                        }
                    }
                }
            }
        }
    });
    return searchFollower;
});
exports.followerAll = followerAll;
const followCreate = (userId, followingId) => __awaiter(void 0, void 0, void 0, function* () {
    const existedFollow = yield db_1.default.follow.findFirst({
        where: {
            // followerId: userId,
            // followingId: followingId
            followerId: followingId,
            followingId: userId
        },
    });
    if (existedFollow) {
        yield db_1.default.follow.deleteMany({
            where: {
                followerId: followingId,
                followingId: userId
            },
        });
        return {
            message: "UnFollow Successs"
        };
    }
    yield db_1.default.follow.create({
        data: {
            followerId: followingId,
            followingId: userId
        },
    });
    return {
        message: "Follow Successss"
    };
});
exports.followCreate = followCreate;
