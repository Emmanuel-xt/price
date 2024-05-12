import Onboarding from "@/components/forms/Onboarding";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="">
        <h6 className="head-text">Complete You Account Creation</h6>
        <h6 className="text-slate-400">
          You are few steps away from finishing your account creation{" "}
        </h6>
      </div>
      <Onboarding />
    </div>
  );
};

export default page;
