import { date } from "@/constants";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const user = await currentUser();
  const userInfo = await fetchUser(user.id);
  return (
    <section className="flex flex-col gap-3">
      {userInfo ? (
        <>
          <div className="flex gap-4 items-center">
            <Image
              src={user.imageUrl || "/assets/logo.svg"}
              width={80}
              height={80}
              alt="logo"
              className="rounded-full"
            />
            <div className="">
              <h6 className="text-heading4-medium text-light-1 ">
                {userInfo.fullname}
              </h6>
              <h6 className="font-thin text-sm ">@{userInfo.email}</h6>
              <p className="text-sm text-slate-500 ">
                Contributor since  {date(userInfo.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:w-[50%]  items- gap-4  w- p-3">
            <h4 className="head-text">Profile</h4>

            <div className="flex flex-col  gap-4">
              <div className="">
                <h6 className="">Full Name</h6>
                <p className="border p-1 rounded border-slate-500 text-heading4-medium text-light-1">
                  {userInfo.fullname}
                </p>
              </div>
              <div className="">
                <h6 className="text-sm ">Username</h6>
                <p className="border p-1 rounded border-slate-500 min-w-44 text-heading4-medium text-light-1">
                  {userInfo.username}
                </p>
              </div>
            </div>
            <div className="flex flex-col  gap-4">
              <div className="">
                <h6 className="text-sm ">Department</h6>
                <p className="border p-1 rounded border-slate-500 text-heading4-medium text-light-1">
                  {userInfo.department}
                </p>
              </div>
              <div className="">
                <h6 className="text-sm ">Level</h6>
                <div className="w-full border border-slate-500">
            <div
              className="bg-primary-500"
              style={{ width: `${(parseFloat(userInfo.level) / 500) * 100}%` }}
            >
              <p className=" p-1 rounded ">{userInfo.level}</p>
            </div>
          </div>
              </div>
            </div>
            {/* <h4 className="text-2xl">Other User Info can Go in here</h4> */}
          </div>
        </>
      ) : (
        <div className="">Fetching Your Record</div>
      )}
    </section>
  );
};

export default page;
