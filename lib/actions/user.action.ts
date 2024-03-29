"use server";

import { Role, University } from "@prisma/client";
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
  let res;

  if (role === "Benefactor") {
    res = await prisma.benefactorInfo.create({
      data: {
        phone: phone || "",
        staffID: staffID || "",
        staffIDPic: staffIDPic || "",
        user: {
          connect: {
            id: newUser.id,
          },
        },
      },
    });
  } else if (role === "Student") {
    res = await prisma.studentInfo.create({
      data: {
        user: {
          connect: {
            id: newUser.id,
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
      benefactorInfo: {
        include: {
          university: true,
          scholarships: true,
        },
      },
      studentInfo: true,
    },
  });
  if (data) return data;

  return;
}

export async function createSchool({
  name,
  address,
  description,
  photo,
  benefactorId,
}: {
  name: string;
  address: string;
  description: string;
  photo: string;
  benefactorId: string;
}) {
  const newData = await prisma.university.create({
    data: {
      name,
      address,
      description,
      photo,
      benefactor: {
        connect: {
          id: benefactorId,
        },
      },
    },
  });

  if (!newData) return false;

  return true;
}
