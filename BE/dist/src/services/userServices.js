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
exports.getSingleUserForToken = exports.getSingleUser = exports.SingleUser = exports.suggestUsers = exports.updateProfileUser = exports.updateUser = exports.deleteUsers = exports.insertUser = exports.getUser = exports.getAllUser = void 0;
const db_1 = __importDefault(require("../lib/db"));
const error_1 = require("../utils/constant/error");
const cloudinary_1 = __importDefault(require("../middlewares/cloudinary"));
const fs = __importStar(require("fs"));
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.users.findMany({
        select: {
            id: true,
            fullname: true,
            username: true,
            profile: {
                select: {
                    avatar: true
                }
            }
        }
    });
});
exports.getAllUser = getAllUser;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.default.users.findFirst({
        where: {
            id,
        },
    });
});
exports.getUser = getUser;
const insertUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.default.users.create({
        data: body,
    });
});
exports.insertUser = insertUser;
const deleteUsers = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield db_1.default.users.findFirst({
        where: {
            id,
        },
    });
    if (!existUser) {
        throw new Error(error_1.ERROR_MESSAGE.DATA_NOT_FOUND);
    }
    yield db_1.default.users.delete({
        where: {
            id,
        },
    });
    return " Sukses delete user dengan id " + id;
});
exports.deleteUsers = deleteUsers;
const updateUser = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield db_1.default.users.findFirst({
        where: {
            id,
        },
    });
    if (!existUser) {
        throw new Error("User not found!!");
    }
    return db_1.default.users.update({
        where: {
            id,
        },
        data: body,
    });
});
exports.updateUser = updateUser;
const updateProfileUser = (userId, body, files) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const updateProfile = yield db_1.default.profile.update({
        where: {
            userId: userId
        },
        data: {
            bio: body.bio
        },
        select: {
            avatar: true,
            cover: true,
            bio: true
        }
    });
    if (files === null || files === void 0 ? void 0 : files.cover) {
        const cover = (_a = files === null || files === void 0 ? void 0 : files.cover[0]) === null || _a === void 0 ? void 0 : _a.path;
        const result = yield cloudinary_1.default.uploader.upload(cover, {
            folder: "circleapp/profile",
        });
        yield db_1.default.profile.update({
            where: {
                userId: userId
            },
            data: {
                cover: result.secure_url
            }
        });
        fs.unlinkSync(cover);
    }
    else {
        // const oldThreadData = await db.profile.findUnique({
        //   where: { userId: userId },
        //   select: { cover: true },
        // });
        // if (oldThreadData) {
        //   const publicId = oldThreadData?.cover?.split("upload").pop()?.slice(13).split(".").shift();
        //   cloudinary.uploader.destroy(publicId as string);
        // }
        yield db_1.default.profile.update({
            where: {
                userId: userId
            },
            data: {
                cover: body.cover
            }
        });
    }
    console.log("🚀 ~ files?.avatar:", files === null || files === void 0 ? void 0 : files.avatar);
    if (files === null || files === void 0 ? void 0 : files.avatar) {
        const avatar = (_b = files === null || files === void 0 ? void 0 : files.avatar[0]) === null || _b === void 0 ? void 0 : _b.path;
        const result = yield cloudinary_1.default.uploader.upload(avatar, {
            folder: "circleapp/profile",
        });
        yield db_1.default.profile.update({
            where: {
                userId: userId
            },
            data: {
                avatar: result.secure_url
            }
        });
        fs.unlinkSync(avatar);
    }
    else {
        // const oldThreadData = await db.profile.findUnique({
        //   where: { userId: userId },
        //   select: { avatar: true },
        // });
        // if (oldThreadData) {
        //   const publicId = oldThreadData?.avatar?.split("upload").pop()?.slice(13).split(".").shift();
        //   cloudinary.uploader.destroy(publicId as string);
        // }
        yield db_1.default.profile.update({
            where: {
                userId: userId
            },
            data: {
                avatar: body.avatar
            }
        });
    }
    return updateProfile;
});
exports.updateProfileUser = updateProfileUser;
const suggestUsers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const suggest = yield db_1.default.users.findMany({
        take: 5,
        select: {
            id: true,
            fullname: true,
            username: true,
            profile: {
                select: {
                    avatar: true
                }
            }
        }
    });
    const filter = suggest.filter(user => user.id !== userId);
    const shuffled = filter.sort(() => 0.5 - Math.random()).slice(0, 10);
    return shuffled;
});
exports.suggestUsers = suggestUsers;
const SingleUser = (condition) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.default.users.findFirst({
        where: condition,
        select: {
            id: true,
            username: true,
            fullname: true,
            email: true,
            profile: {
                select: {
                    avatar: true,
                    cover: true,
                    bio: true
                }
            },
            follower: true,
            following: true
        }
    });
});
exports.SingleUser = SingleUser;
const getSingleUser = (condition) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.default.users.findFirst({
        where: condition
    });
});
exports.getSingleUser = getSingleUser;
const getSingleUserForToken = (condition) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.default.users.findFirst({
        where: condition,
        select: {
            id: true
        }
    });
});
exports.getSingleUserForToken = getSingleUserForToken;
