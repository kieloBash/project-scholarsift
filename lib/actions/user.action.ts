"use server";

import { Role, UserInfo } from "@prisma/client";
import prisma from "../prisma";

export async function createUser({
  email,
  name,
  role,
  profilePic,
  phone,
  staffID,
  staffIDPic,
}: {
  email: string;
  name: string;
  role: Role;
  profilePic?: string;
  phone?: string;
  staffID?: string;
  staffIDPic?: string;
}) {
  const newUser = await prisma.user.create({
    data: { email, name, role, profilePic },
  });

  if (!newUser) {
    console.log("Error in Creating new User");
    return false;
  }

  const userInfo = await prisma.userInfo.create({
    data: {
      user: {
        connect: {
          id: newUser.id,
        },
      },
    },
  });
  let res;

  if (role === "Benefactor") {
    res = await prisma.benefactorInfo.create({
      data: {
        phone: phone || "",
        staffID: staffID || "",
        staffIDPic: staffIDPic || "",
        user: {
          connect: {
            id: userInfo.id,
          },
        },
      },
    });
  } else if (role === "Student") {
    res = await prisma.studentInfo.create({
      data: {
        user: {
          connect: {
            id: userInfo.id,
          },
        },
      },
    });
  }

  return true;
}

export async function existingUser({ email }: { email: string }) {
  const data = await prisma.user.findFirst({
    where: { email },
    include: {
      userInfo: { include: { benefactorInfo: true, studentInfo: true } },
    },
  });
  if (data) return data;

  return;
}
