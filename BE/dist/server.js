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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./src/routers"));
dotenv_1.default.config();
const PORT = 4000;
const app = (0, express_1.default)();
// app.use(cors({
//   origin: ['https://circle-wd-fe.vercel.app']
// }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use("/uploads", express.static(path.join(__dirname, "src/uploads"))) // untuk menjadikan sebuah folder bisa diakses secara global
app.use(routers_1.default);
app.get("/", (req, res) => {
    res.send("INI ADALAH DEFAULT EXPRESS UNTUK BE");
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🚀 ~ app.listen ~ PORT:", PORT);
}));
