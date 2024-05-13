"use server";

import prisma from "@/prisma/prisma";

export async function createUser(
{  id,
  email,
  fullname,
  username,
  department,
  level,
  createdAt,
  gender}
) {
  console.log("about to run create user function");
  try {
    console.log({id, email, fullname, username, department, level , createdAt ,  gender});
    const user = await prisma.user.create({
      data: {
        id : id,
        email : email ,
        username : username ,
        fullname : fullname,
        department : department,
        level : level ,
        createdAt : createdAt,
        gender: gender
      },
    });
    console.log("User created succefully", user);
  } catch (error) {
    console.log("error creating user", error);
  }
}

