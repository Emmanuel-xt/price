import {
  calculateAverage,
  filterOutliers,
  roundPrice,
  truthy,
} from "@/constants";
import React from "react";
import Example from "../DemoChart";
import Link from "next/link";

const Price = ({ item, prices }) => {
  const truty = truthy(prices);
  console.log("thruthy =", truty);
  console.log("item =", item.name);
  return (
    <div className="flex flex-col gap-3">
      <div className="">
        <h5 className="text-[36px] ">₦{roundPrice(filterOutliers(prices))}</h5>
        <h6 className="text-left">{filterOutliers(prices)}</h6>
      </div>
      <Example />
      <div className="border-t border-t-slate-900">
        <h3 className="my-5 font-medium text-[20px] text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Contributors
        </h3>
        <div className="flex text-slate-400 text-xsm">
          <h6 className="flex-1">Username</h6>
          <h6 className="flex-1">Price</h6>
          <h6 className="flex-1">Date</h6>
        </div>
        {item.prices.map((price) => (
            <Link href={`/edit/${price.id}`} key={price.userName}>
          <div className="flex " >
              <h6 className="flex-1">{price.userName}</h6>
              <h6
                className={`flex-1 ${
                  Array.isArray(truty)
                    ? truty.includes(price.value)
                      ? "text-green-500"
                      : "text-red-500"
                    : truty === price.value
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {roundPrice(price.value)}
              </h6>
              <h6 className="flex-1">24-04-24</h6>
          </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default Price;
