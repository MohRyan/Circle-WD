import multer from "multer";
import path from "path";
import { NextFunction, Request, Response } from "express";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + file.originalname.replace(/\s/g, "")
    );
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported"), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
})


const upload2 = multer({
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

export const uploadMiddleware = (fieldname: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    upload2(req, res, (err) => {
      if (err instanceof multer.MulterError) {
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

