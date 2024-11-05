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
exports.checkToken = exports.login = exports.verify = exports.createVerification = exports.register = void 0;
const client_1 = require("@prisma/client");
const registerValidation_1 = __importDefault(require("../lib/validation/registerValidation"));
const error_1 = require("../utils/constant/error");
const userService = __importStar(require("./userServices"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginVlidation_1 = __importDefault(require("../lib/validation/loginVlidation"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../lib/db"));
const prisma = new client_1.PrismaClient();
const register = (body) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. untuk mengvalidasi atau konfirmasi type data dari form Users
    const { error, value } = registerValidation_1.default.validate(body);
    if (error === null || error === void 0 ? void 0 : error.details) {
        console.log("🚀 ~ register ~ error:", error);
        throw new Error(error_1.ERROR_MESSAGE.WRONG_INPUT);
    }
    // 2. untuk mengecek emailnya ada atau tidak
    const existEmail = yield userService.getSingleUser({
        email: value.email,
    });
    // 3. untuk meng encryptkan password menggunakan bycrpt ( hash )
    const hashedPassword = yield bcrypt_1.default.hash(value.password, 10);
    const user = yield userService.insertUser(Object.assign(Object.assign({}, value), { password: hashedPassword }));
    yield db_1.default.profile.create({
        data: {
            userId: user.id
        }
    });
    return {
        id: user.id,
        email: user.email
    };
});
exports.register = register;
const createVerification = (token, type) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.verification.create({
        data: {
            token,
            type,
        },
    });
});
exports.createVerification = createVerification;
const verify = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // pakek cara, kita bikin table baru untuk khusus nyimpan tokennya, lalu cocokkan
        const verification = yield prisma.verification.findUnique({
            where: { token },
        });
        const userId = jsonwebtoken_1.default.verify(verification.token, process.env.JWT_SECRET);
        if (verification.type === "FORGOT_PASSWORD") {
            //TODO: create forgot password
            return;
        }
        return yield prisma.users.update({
            data: {
                isVerified: true,
            },
            where: {
                id: String(userId),
            },
        });
    }
    catch (error) {
        throw new Error("Failed to verify email");
    }
});
exports.verify = verify;
// export const login = async (body: users): Promise<{ token: string, userLogin: users }> => {
const login = (body) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. untuk meng validate atau mengkonfirmasi inputan dari form login
    const { error, value } = loginVlidation_1.default.validate(body);
    if (error === null || error === void 0 ? void 0 : error.details) {
        console.log("🚀 ~ login ~ error:", error);
        throw new Error(error_1.ERROR_MESSAGE.WRONG_INPUT);
    }
    // 2. untuk mengecek adanya email atau tidak
    const existUser = yield userService.SingleUser({
        email: value.email,
    });
    const existEmail = yield userService.getSingleUser({
        email: value.email,
    });
    const existToken = yield userService.getSingleUserForToken({
        email: value.email,
    });
    if (!existEmail) {
        throw new Error(error_1.ERROR_MESSAGE.DATA_NOT_FOUND);
    }
    // 3. untuk mengecek password yang sudah dihash ( mencocokkan password compare dengan password hash )
    const isMatch = yield bcrypt_1.default.compare(value.password, existEmail.password);
    if (!isMatch) {
        throw new Error(error_1.ERROR_MESSAGE.DATA_NOT_FOUND);
    }
    const token = jsonwebtoken_1.default.sign(existToken, process.env.JWT_SECRET, {
        expiresIn: "2d",
    });
    return {
        token,
        userLogin: existUser
    };
});
exports.login = login;
const checkToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // untuk mengecek adanya email atau tidak
    const existUser = yield userService.SingleUser({
        id: id,
    });
    if (!existUser) {
        throw new Error(error_1.ERROR_MESSAGE.DATA_NOT_FOUND);
    }
    return {
        userLogin: existUser
    };
});
exports.checkToken = checkToken;
