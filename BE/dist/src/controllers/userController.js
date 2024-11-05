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
exports.suggestUsers = exports.updateProfileUser = exports.updateUser = exports.deleteUser = exports.createUser = exports.getUser = exports.getAllUser = void 0;
const userService = __importStar(require("../services/userServices"));
const errorHandler_1 = require("../utils/errorHandler");
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataUser = yield userService.getAllUser();
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
exports.getAllUser = getAllUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params } = req;
        const { id } = res.locals.userId;
        const userId = id;
        const dataUser = yield userService.getUser(userId);
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
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const dataInsertUser = yield userService.insertUser(body);
        res.status(200).json(dataInsertUser);
    }
    catch (error) {
        console.log("🚀 ~ createUser ~ error:", error);
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.createUser = createUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params } = req;
        const { userId } = params;
        const messageDeleteUser = yield userService.deleteUsers(userId);
        res.status(200).json({ message: messageDeleteUser });
    }
    catch (error) {
        console.log("🚀 ~ deleteUser ~ error:", error);
        return (0, errorHandler_1.errorHandler)(error, res);
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body, params } = req;
        const { userId } = params;
        const dataUpdateUser = yield userService.updateUser(userId, body);
        res.status(200).json(dataUpdateUser);
    }
    catch (error) {
        console.log("🚀 ~ updateUser ~ error:", error);
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.updateUser = updateUser;
const updateProfileUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { id } = res.locals.userId;
        const files = req.files;
        const dataUpdateUser = yield userService.updateProfileUser(id, body, files);
        res.status(200).json(dataUpdateUser);
    }
    catch (error) {
        console.log("🚀 ~ updateUser ~ error:", error);
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.updateProfileUser = updateProfileUser;
const suggestUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId.id;
        const dataSuggestUser = yield userService.suggestUsers(userId);
        res.status(200).json(dataSuggestUser);
    }
    catch (error) {
        console.log("🚀 ~ getUser ~ error:", error);
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.suggestUsers = suggestUsers;
