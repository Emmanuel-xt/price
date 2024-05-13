import Onboarding from "@/components/forms/Onboarding";
import { date } from "@/constants";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const page = async () => {
    const user = await currentUser()
    if(!user) return null 

    // console.log({user})
    const userInfo = {}

    const userData = {
        id: user.id,
        createdAt :  date(user.createdAt) ,
        gender : user.gender,
        fullname : user.firstName + ' ' + user.lastName,
        email : user.emailAddresses[0].emailAddress

    }
console.log({userData})
  return (
    <div className="flex flex-col gap-10">
      <div className="">
        <h6 className="head-text">Complete You Account Creation</h6>
        <h6 className="text-slate-400">
          You are few steps away from finishing your account setup{" "}
        </h6>
      </div>
      <Onboarding user={userData} />
    </div>
  );
};

export default page;
