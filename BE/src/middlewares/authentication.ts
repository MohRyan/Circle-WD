import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authentication = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, String(process.env.JWT_SECRET));

    if (!decoded) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }

    res.locals.userId = decoded;
    next();
  } catch (error) {
    const err = error as unknown as Error;
    console.log("🚀 ~ authentication ~ err:", err);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export default authentication;
