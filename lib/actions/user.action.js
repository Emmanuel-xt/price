"use server";

import prisma from "@/prisma/prisma";

export async function createUser({
  id,
  email,
  fullname,
  username,
  department,
  level,
  createdAt,
  gender,
}) {
  console.log("about to run create user function");
  try {
    const user = await prisma.user.upsert({
      where: {
        id: id,
      },
      create: {
        id: id,
        email: email,
        username: username,
        fullname: fullname,
        department: department,
        level: level,
        createdAt: createdAt,
        gender: gender,
      },
      update: {
        username: username,
        fullname: fullname,
        department: department,
        level: level,
      },
    });
    console.log("User created succefully : ", user.fullname , '😊');
    return true;
  } catch (error) {
    console.log("error creating user", error);
    return false;
  }
}

export const fetchUser = async (id) => {
  try {
    console.log("Trying to fetch user with id : ", id, "🗣️");
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    console.log("User", user.username, " was found 🫂");
    return user;
  } catch (error) {
    console.log("error fetching user with id : ", id, "😓", error);
  }
};
