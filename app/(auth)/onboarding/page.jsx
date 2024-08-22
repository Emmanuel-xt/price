import Onboarding from "@/components/forms/Onboarding";
import { date } from "@/constants";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const page = async ({ searchParams }) => {

  const user = await currentUser();
  if (!user) return null;
  const query = searchParams.q

  // console.log('pa', searchParams.q)
  const userInfo = await fetchUser(user.id);
  console.log('user info', user)
  console.log('user info', userInfo)

  const userData = {
    id:  user.id,
    createdAt: date(user.createdAt),
    gender: user.gender,
    fullname: userInfo ? userInfo.fullname : user.firstName + " " + user.lastName,
    email: user.emailAddresses[0].emailAddress,
    username : userInfo ?  userInfo.username : '',
    department : userInfo ?  userInfo.department : '',
    level : userInfo ?  userInfo.level : '',
  };
  // console.log({ userData });
  return (
    <div className="flex flex-col gap-10">
      <div className="">
        <h6 className="head-text">
          {userInfo ? "Edit Your Profile" : "Complete Your Account Creation"}
        </h6>
        <h6 className="text-slate-400">
          {!userInfo &&
            "You are few steps away from finishing your account setup"}
        </h6>
      </div>
      <Onboarding user={userData} next={query} />
    </div>
  );
};

export default page;
