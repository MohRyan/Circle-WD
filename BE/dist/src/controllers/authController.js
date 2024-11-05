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
exports.checkToken = exports.login = exports.verifyEmail = exports.register = void 0;
const authService = __importStar(require("../services/authServices"));
const errorHandler_1 = require("../utils/errorHandler");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataRegister = yield authService.register(req.body);
        const fullUrl = req.protocol + "://" + req.get("host");
        const token = jsonwebtoken_1.default.sign(dataRegister.id.toString(), process.env.JWT_SECRET);
        // const info = await transporter.sendMail({
        //   from: '"CircleApp for MohRyan"<ryanmoh735@gmail.com>', // sender address
        //   to: dataRegister.email, // list of receivers
        //   subject: "Verification Link", // Subject line
        //   html: `<a href="${fullUrl}/api/v1/auth/verify-email?token=${token}">Klik untuk verifikasi email kamu!</a>`, // html body
        // });
        // console.log("Message sent: %s", info.messageId);
        yield authService.createVerification(token, "EMAIL");
        res.status(201).json(dataRegister);
    }
    catch (error) {
        res.status(500).json({
            message: error,
        });
    }
});
exports.register = register;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.query.token;
        yield authService.verify(token);
        // const frontendUrl = process.env.FRONTEND_URL;
        // res.redirect(`${frontendUrl}/auth/login`);
    }
    catch (error) {
        res.status(500).json({
            message: error,
        });
    }
});
exports.verifyEmail = verifyEmail;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataLogin = yield authService.login(req.body);
        res.status(200).json(dataLogin);
    }
    catch (error) {
        console.log("🚀 ~ login ~ error:", error);
        return (0, errorHandler_1.errorHandler)(error, res);
    }
});
exports.login = login;
const checkToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = res.locals.userId;
        const dataLogin = yield authService.checkToken(id);
        res.status(200).json(dataLogin);
    }
    catch (error) {
        console.log("🚀 ~ login ~ error:", error);
        return (0, errorHandler_1.errorHandler)(error, res);
    }
});
exports.checkToken = checkToken;
