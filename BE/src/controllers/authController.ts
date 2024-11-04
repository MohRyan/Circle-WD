import { Request, Response } from "express";
import * as authService from "../services/authServices";
import { users } from "@prisma/client";
import { errorHandler } from "../utils/errorHandler";
import jwt from "jsonwebtoken";
import { transporter } from "../config/nodeMailer";

export const register = async (req: Request, res: Response) => {
  try {
    const dataRegister = await authService.register(req.body as users);
    const fullUrl = req.protocol + "://" + req.get("host");
    const token = jwt.sign(dataRegister.id.toString(), process.env.JWT_SECRET!)

    // const info = await transporter.sendMail({
    //   from: '"CircleApp for MohRyan"<ryanmoh735@gmail.com>', // sender address
    //   to: dataRegister.email, // list of receivers
    //   subject: "Verification Link", // Subject line
    //   html: `<a href="${fullUrl}/api/v1/auth/verify-email?token=${token}">Klik untuk verifikasi email kamu!</a>`, // html body
    // });

    // console.log("Message sent: %s", info.messageId);

    await authService.createVerification(token, "EMAIL");

    res.status(201).json(dataRegister);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;
    await authService.verify(token);
    // const frontendUrl = process.env.FRONTEND_URL;
    // res.redirect(`${frontendUrl}/auth/login`);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const dataLogin = await authService.login(req.body as users);
    res.status(200).json(dataLogin);
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);

    return errorHandler(error, res);
  }
};


export const checkToken = async (req: Request, res: Response) => {
  try {

    const { id } = res.locals.userId
    const dataLogin = await authService.checkToken(id);
    res.status(200).json(dataLogin);
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);

    return errorHandler(error, res);
  }
};


