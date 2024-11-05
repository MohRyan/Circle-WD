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
exports.replyDelete = exports.replyByThreadId = exports.replyAll = exports.replyCreate = exports.threadsEdit = exports.threadsDelete = exports.threadsCreate = exports.threadsOnebyId = exports.threadsAllbyUserId = exports.threadsAllbyUserLogin = exports.threadsAll = void 0;
const db_1 = __importDefault(require("../lib/db"));
const fs = __importStar(require("fs"));
const cloudinary_1 = __importDefault(require("../middlewares/cloudinary"));
const threadsAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const threads = yield db_1.default.thread.findMany({
        include: {
            author: {
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
            },
            image: {
                select: {
                    image: true
                }
            },
            like: {}
        },
        orderBy: {
            id: "desc"
        }
    });
    return {
        threads,
    };
});
exports.threadsAll = threadsAll;
const threadsAllbyUserLogin = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.thread.findMany({
        where: {
            AND: {
                threadRId: null
            },
            userId: userId
        }, include: {
            image: true,
            author: {
                select: {
                    username: true,
                    fullname: true,
                    profile: {
                        select: {
                            avatar: true
                        }
                    }
                }
            },
        },
        orderBy: {
            id: "desc"
        }
    });
});
exports.threadsAllbyUserLogin = threadsAllbyUserLogin;
const threadsAllbyUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const thread = yield db_1.default.thread.findMany({
        where: {
            AND: {
                threadRId: null
            },
            userId: userId
        },
        include: {
            image: true,
            author: {
                select: {
                    username: true,
                    fullname: true,
                    profile: {
                        select: {
                            avatar: true
                        }
                    }
                }
            },
        },
        orderBy: {
            id: "desc"
        }
    });
    const user = yield db_1.default.users.findFirst({
        where: {
            id: userId
        },
        select: {
            username: true,
            fullname: true,
            profile: {
                select: {
                    avatar: true,
                    cover: true,
                    bio: true
                }
            },
            follower: true,
            following: true,
        },
    });
    return {
        user,
        thread
    };
});
exports.threadsAllbyUserId = threadsAllbyUserId;
const threadsOnebyId = (threadId) => __awaiter(void 0, void 0, void 0, function* () {
    const thread = yield db_1.default.thread.findFirst({
        where: {
            id: threadId
        },
    });
    const reply = yield db_1.default.thread.findMany({
        where: {
            NOT: {
                threadRId: null
            },
            threadRId: threadId
        },
        select: {
            content: true,
            image: {
                select: {
                    image: true
                }
            },
            author: {
                select: {
                    username: true,
                    fullname: true,
                    profile: true,
                }
            }
        },
    });
    return {
        thread,
        reply,
        countReply: reply.length
    };
});
exports.threadsOnebyId = threadsOnebyId;
const threadsCreate = (body, userId, files) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("🚀 ~ threadsCreate ~ files:", files)
    const threads = yield db_1.default.thread.create({
        data: Object.assign(Object.assign({}, body), { threadRId: null, userId: userId }),
    });
    if (!files) {
        return;
    }
    else {
        // check if multiple files are uploaded
        if (Array.isArray(files)) {
            for (const file of files) {
                const result = yield cloudinary_1.default.uploader.upload(file.path, {
                    folder: "circleapp/threads",
                });
                yield db_1.default.threadImage.create({
                    data: {
                        image: result.secure_url,
                        threadId: threads.id
                    }
                });
                fs.unlinkSync(file.path);
            }
        }
        else {
            // single file uploaded
            const file = files;
            const result = yield cloudinary_1.default.uploader.upload(file.path, {
                folder: "circleapp/threads",
            });
            yield db_1.default.threadImage.create({
                data: {
                    image: result.secure_url,
                    threadId: threads.id
                }
            });
            fs.unlinkSync(file.path);
        }
    }
    return threads;
    // return await db.thread.create({
    //     data: {
    //         ...body,
    //         userId: body.userId
    //     }
    // })
});
exports.threadsCreate = threadsCreate;
const threadsDelete = (threadId) => __awaiter(void 0, void 0, void 0, function* () {
    const oldThreadData = yield db_1.default.thread.findUnique({
        where: { id: threadId },
        select: { image: true },
    });
    oldThreadData === null || oldThreadData === void 0 ? void 0 : oldThreadData.image.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (oldThreadData && item) {
            const publicId = (_a = item.image.split("upload").pop()) === null || _a === void 0 ? void 0 : _a.slice(13).split(".").shift();
            cloudinary_1.default.uploader.destroy(publicId);
        }
    }));
    yield db_1.default.threadImage.deleteMany({
        where: {
            threadId: threadId
        }
    });
    yield db_1.default.like.deleteMany({
        where: {
            threadId: threadId
        }
    });
    yield db_1.default.thread.deleteMany({
        where: {
            threadRId: threadId
        }
    });
    return yield db_1.default.thread.delete({
        where: {
            id: threadId
        }
    });
});
exports.threadsDelete = threadsDelete;
const threadsEdit = (threadId, content) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.thread.update({
        where: {
            id: threadId
        },
        data: {
            content: content
        }
    });
});
exports.threadsEdit = threadsEdit;
const replyCreate = (body, userId, files, threadsId) => __awaiter(void 0, void 0, void 0, function* () {
    const reply = yield db_1.default.thread.create({
        data: Object.assign(Object.assign({}, body), { threadRId: threadsId, userId: userId })
    });
    if (!files) {
        return;
    }
    else {
        // check if multiple files are uploaded
        if (Array.isArray(files)) {
            for (const file of files) {
                const result = yield cloudinary_1.default.uploader.upload(file.path, {
                    folder: "circleapp/threads",
                });
                yield db_1.default.threadImage.create({
                    data: {
                        image: result.secure_url,
                        threadId: reply.id
                    }
                });
                fs.unlinkSync(file.path);
            }
        }
        else {
            // single file uploaded
            const file = files;
            const result = yield cloudinary_1.default.uploader.upload(file.path, {
                folder: "circleapp/threads",
            });
            yield db_1.default.threadImage.create({
                data: {
                    image: result.secure_url,
                    threadId: reply.id
                }
            });
            fs.unlinkSync(file.path);
        }
    }
    return reply;
});
exports.replyCreate = replyCreate;
const replyAll = (threadsId) => __awaiter(void 0, void 0, void 0, function* () {
    const Count = yield db_1.default.thread.count({
        where: {
            threadRId: threadsId
        },
    });
    return Count;
});
exports.replyAll = replyAll;
const replyByThreadId = (threadId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.thread.findMany({
        where: {
            NOT: {
                threadRId: null
            },
            threadRId: threadId
        },
        include: {
            image: {
                select: {
                    image: true
                }
            }
        }
    });
});
exports.replyByThreadId = replyByThreadId;
const replyDelete = (threadId) => __awaiter(void 0, void 0, void 0, function* () {
    const oldThreadData = yield db_1.default.thread.findUnique({
        where: { id: threadId },
        select: { image: true },
    });
    oldThreadData === null || oldThreadData === void 0 ? void 0 : oldThreadData.image.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        if (oldThreadData && item) {
            const publicId = (_b = item.image.split("upload").pop()) === null || _b === void 0 ? void 0 : _b.slice(13).split(".").shift();
            cloudinary_1.default.uploader.destroy(publicId);
        }
    }));
    yield db_1.default.threadImage.deleteMany({
        where: {
            threadId: threadId
        }
    });
    return yield db_1.default.thread.delete({
        where: {
            id: threadId
        }
    });
});
exports.replyDelete = replyDelete;
