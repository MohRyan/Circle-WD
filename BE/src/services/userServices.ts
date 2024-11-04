import { profile, users } from "@prisma/client";
import db from "../lib/db";
import { ERROR_MESSAGE } from "../utils/constant/error";
import cloudinary from "../middlewares/cloudinary";
import * as fs from "fs";


export const getAllUser = async () => {
  return await db.users.findMany({
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
};

export const getUser = async (id: string): Promise<users | null> => {
  return db.users.findFirst({
    where: {
      id,
    },
  });
};

export const insertUser = async (body: users): Promise<users> => {
  return db.users.create({
    data: body,
  });
};

export const deleteUsers = async (id: string): Promise<string> => {
  const existUser = await db.users.findFirst({
    where: {
      id,
    },
  });

  if (!existUser) {
    throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND);
  }

  await db.users.delete({
    where: {
      id,
    },
  });

  return " Sukses delete user dengan id " + id;
};

export const updateUser = async (
  id: string,
  body: users
): Promise<users | Error> => {
  const existUser = await db.users.findFirst({
    where: {
      id,
    },
  });

  if (!existUser) {
    throw new Error("User not found!!");
  }

  return db.users.update({
    where: {
      id,
    },
    data: body,
  });
};

export const updateProfileUser = async (
  userId: string,
  body: profile,
  files: { [fieldname: string]: Express.Multer.File[] }
) => {

  const updateProfile = await db.profile.update({
    where: {
      userId: userId
    },
    data: {
      bio: body.bio
    },
    select: {
      avatar: true,
      cover: true,
      bio: true
    }
  });

  if (files?.cover) {
    const cover = files?.cover[0]?.path
    const result = await cloudinary.uploader.upload(cover, {
      folder: "circleapp/profile",
    });
    await db.profile.update({
      where: {
        userId: userId
      },
      data: {
        cover: result.secure_url
      }
    })
    fs.unlinkSync(cover);
  } else {
    // const oldThreadData = await db.profile.findUnique({
    //   where: { userId: userId },
    //   select: { cover: true },
    // });

    // if (oldThreadData) {
    //   const publicId = oldThreadData?.cover?.split("upload").pop()?.slice(13).split(".").shift();
    //   cloudinary.uploader.destroy(publicId as string);
    // }

    await db.profile.update({
      where: {
        userId: userId
      },
      data: {
        cover: body.cover!
      }
    })
  }

  console.log("🚀 ~ files?.avatar:", files?.avatar)
  if (files?.avatar) {
    const avatar = files?.avatar[0]?.path
    const result = await cloudinary.uploader.upload(avatar, {
      folder: "circleapp/profile",
    });
    await db.profile.update({
      where: {
        userId: userId
      },
      data: {
        avatar: result.secure_url
      }
    })
    fs.unlinkSync(avatar);
  } else {

    // const oldThreadData = await db.profile.findUnique({
    //   where: { userId: userId },
    //   select: { avatar: true },
    // });

    // if (oldThreadData) {
    //   const publicId = oldThreadData?.avatar?.split("upload").pop()?.slice(13).split(".").shift();
    //   cloudinary.uploader.destroy(publicId as string);
    // }

    await db.profile.update({
      where: {
        userId: userId
      },
      data: {
        avatar: body.avatar!
      }
    })
  }
  return updateProfile
};


export const suggestUsers = async (userId: string) => {
  const suggest = await db.users.findMany({
    take: 5,
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
  })

  const filter = suggest.filter(user => user.id !== userId)

  const shuffled = filter.sort(() => 0.5 - Math.random()).slice(0, 10);

  return shuffled;
}




export const SingleUser = async (condition: {
  [key: string]: string;
}) => {
  return db.users.findFirst({
    where: condition,
    select: {
      id: true,
      username: true,
      fullname: true,
      email: true,
      profile: {
        select: {
          avatar: true,
          cover: true,
          bio: true
        }
      },
      follower: true,
      following: true
    }
  });
};

export const getSingleUser = async (condition: {
  [key: string]: string;
}) => {
  return db.users.findFirst({
    where: condition
  });
};

export const getSingleUserForToken = async (condition: {
  [key: string]: string;
}): Promise<{ id: string } | null> => {
  return db.users.findFirst({
    where: condition,
    select: {
      id: true
    }
  });
};
