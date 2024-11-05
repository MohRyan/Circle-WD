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
exports.getAllUsersSearch = exports.searchAllUsers = void 0;
const db_1 = __importDefault(require("../lib/db"));
const searchAllUsers = (querySeach) => __awaiter(void 0, void 0, void 0, function* () {
    const searchUser = yield db_1.default.users.findMany({
        where: {
            fullname: {
                // contains: querySeach.fullname,
                startsWith: querySeach.fullname,
                mode: 'insensitive'
            }
        },
        select: {
            fullname: true,
            username: true,
            profile: {
                select: {
                    avatar: true
                }
            }
        }
    });
    return searchUser;
});
exports.searchAllUsers = searchAllUsers;
const getAllUsersSearch = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const searchUser = yield db_1.default.users.findMany({
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
    const filter = searchUser.filter(user => user.id !== userId);
    return filter;
});
exports.getAllUsersSearch = getAllUsersSearch;
