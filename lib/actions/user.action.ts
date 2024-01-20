"use server";

import { Role } from "@prisma/client";
import prisma from "../prisma";

export async function createUser({
  email,
  name,
  role,
  phone,
  profilePic,
}: {
  email: string;
  name: string;
  role: Role;
  phone?: string;
  profilePic?: string;
}) {
  const newData = await prisma.user.create({
    data: { email, name, role, phone, profilePic },
  });

  if (!newData) {
    console.log("Error in Creating new User");
    return false;
  }

  return true;
}

export async function existingUser({ email }: { email: string }) {
  const data = await prisma.user.findFirst({ where: { email } });
  if (data) return data;

  return;
}
