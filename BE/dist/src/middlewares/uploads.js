"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../../uploads"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname.replace(/\s/g, ""));
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("File type not supported"), false);
    }
};
exports.upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
});
const upload2 = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2,
    },
}).fields([
    {
        name: "avatar",
        maxCount: 1,
    },
    {
        name: "cover",
        maxCount: 1,
    },
]);
const uploadMiddleware = (fieldname) => {
    return (req, res, next) => {
        upload2(req, res, (err) => {
            if (err instanceof multer_1.default.MulterError) {
                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json({
                        status: false,
                        message: "File too large",
                    });
                }
                return res.status(500).json({
                    status: false,
                    message: err.message,
                });
            }
            return next();
        });
    };
};
exports.uploadMiddleware = uploadMiddleware;
