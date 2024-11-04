import { PrismaClient, users, VerificationType } from "@prisma/client";
import registerSchema from "../lib/validation/registerValidation";
import { ERROR_MESSAGE } from "../utils/constant/error";
import * as userService from "./userServices";
import bycrpt from "bcrypt";
import loginSchema from "../lib/validation/loginVlidation";
import jwt from "jsonwebtoken";
import db from "../lib/db";

const prisma = new PrismaClient();

export const register = async (body: users): Promise<{ id: string, email: string }> => {
  // 1. untuk mengvalidasi atau konfirmasi type data dari form Users
  const { error, value } = registerSchema.validate(body);
  if (error?.details) {
    console.log("🚀 ~ register ~ error:", error);

    throw new Error(ERROR_MESSAGE.WRONG_INPUT);
  }

  // 2. untuk mengecek emailnya ada atau tidak
  const existEmail = await userService.getSingleUser({
    email: value.email,
  });

  // 3. untuk meng encryptkan password menggunakan bycrpt ( hash )
  const hashedPassword = await bycrpt.hash(value.password, 10);

  const user = await userService.insertUser({
    ...value,
    password: hashedPassword,
  });

  await db.profile.create({
    data: {
      userId: user.id
    }
  })

  return {
    id: user.id,
    email: user.email
  };
};

export const createVerification = async (token: string, type: VerificationType) => {
  return await prisma.verification.create({
    data: {
      token,
      type,
    },
  });
}

export const verify = async (token: string) => {
  try {
    // pakek cara, kita bikin table baru untuk khusus nyimpan tokennya, lalu cocokkan
    const verification = await prisma.verification.findUnique({
      where: { token },
    });

    const userId = jwt.verify(verification!.token, process.env.JWT_SECRET!);

    if (verification!.type === "FORGOT_PASSWORD") {
      //TODO: create forgot password
      return;
    }

    return await prisma.users.update({
      data: {
        isVerified: true,
      },
      where: {
        id: String(userId),
      },
    });
  } catch (error) {
    throw new Error("Failed to verify email");
  }
}


// export const login = async (body: users): Promise<{ token: string, userLogin: users }> => {
export const login = async (body: users) => {
  // 1. untuk meng validate atau mengkonfirmasi inputan dari form login
  const { error, value } = loginSchema.validate(body);

  if (error?.details) {
    console.log("🚀 ~ login ~ error:", error);

    throw new Error(ERROR_MESSAGE.WRONG_INPUT);
  }

  // 2. untuk mengecek adanya email atau tidak
  const existUser = await userService.SingleUser({
    email: value.email,
  });

  const existEmail = await userService.getSingleUser({
    email: value.email,
  });

  const existToken = await userService.getSingleUserForToken({
    email: value.email,
  });

  if (!existEmail) {
    throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND);
  }

  // 3. untuk mengecek password yang sudah dihash ( mencocokkan password compare dengan password hash )
  const isMatch = await bycrpt.compare(
    value.password,
    existEmail.password as string
  );
  if (!isMatch) {
    throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND);
  }

  const token = jwt.sign(existToken!, process.env.JWT_SECRET!, {
    expiresIn: "2d",
  });

  return {
    token,
    userLogin: existUser
  };
};


export const checkToken = async (id: string) => {
  // untuk mengecek adanya email atau tidak


  const existUser = await userService.SingleUser({
    id: id,
  });

  if (!existUser) {
    throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND);
  }

  return {
    userLogin: existUser
  };
};
