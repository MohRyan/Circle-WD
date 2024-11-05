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
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyByThreadId = exports.replyAll = exports.replyCreate = exports.threadsEdit = exports.threadsDelete = exports.threadsCreate = exports.threadsOneById = exports.threadsAllByUserId = exports.threadsAllbyUserLogin = exports.threadsAll = void 0;
const threadsServices = __importStar(require("../services/threadsSevices"));
const threadsAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataThreads = yield threadsServices.threadsAll();
        res.status(200).json(dataThreads);
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.threadsAll = threadsAll;
const threadsAllbyUserLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId.id;
        const dataThreads = yield threadsServices.threadsAllbyUserLogin(userId);
        res.status(200).json(dataThreads);
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.threadsAllbyUserLogin = threadsAllbyUserLogin;
const threadsAllByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const dataThreads = yield threadsServices.threadsAllbyUserId(userId);
        res.status(200).json(dataThreads);
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.threadsAllByUserId = threadsAllByUserId;
const threadsOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { threadId } = req.params;
        const dataThreads = yield threadsServices.threadsOnebyId(threadId);
        res.status(200).json(dataThreads);
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.threadsOneById = threadsOneById;
const threadsCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const userId = res.locals.userId.id;
        const thread = yield threadsServices.threadsCreate(body, userId, req.files);
        return res.json({
            status: true,
            message: "success",
            data: thread,
        });
        // res.status(200).json(dataThreads)
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.threadsCreate = threadsCreate;
const threadsDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { threadId } = req.params;
        const dataThreads = yield threadsServices.threadsDelete(threadId);
        res.status(200).json(dataThreads);
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.threadsDelete = threadsDelete;
const threadsEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { threadId } = req.params;
        const { content } = req.body;
        const dataThreads = yield threadsServices.threadsEdit(threadId, content);
        res.status(200).json(dataThreads);
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.threadsEdit = threadsEdit;
const replyCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { threadsId } = req.params;
        const userId = res.locals.userId.id;
        const thread = yield threadsServices.replyCreate(body, userId, req.files, threadsId);
        return res.json({
            status: true,
            message: "success",
            data: thread,
        });
        // res.status(200).json(dataThreads)
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.replyCreate = replyCreate;
const replyAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { threadId } = req.params;
        const dataReply = yield threadsServices.replyAll(threadId);
        res.status(200).json(dataReply);
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.replyAll = replyAll;
const replyByThreadId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { threadId } = req.params;
        const dataReply = yield threadsServices.replyByThreadId(threadId);
        res.status(200).json(dataReply);
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.replyByThreadId = replyByThreadId;
