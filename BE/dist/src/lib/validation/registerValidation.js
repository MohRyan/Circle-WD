"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// validation register default / basic
const registerSchema = joi_1.default.object({
    username: joi_1.default.string().required().min(5),
    fullname: joi_1.default.string().required().min(5),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().min(8),
});
// validation register custom
// const registerSchema = Joi.object({
//     fullname: Joi.string().required().min(5),
//     email: Joi.string().email().required(),
//     password: Joi.string().required().min(8),
//     address: Joi.string().required(),
//     phone_number: Joi.string().required(),
//     gender: Joi.string().valid("Pria", "Wanita").required(),
//     role: Joi.string().valid("USER", "ADMIN").required()
// })
exports.default = registerSchema;
