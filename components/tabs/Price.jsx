import {
  calculateAverage,
  filterOutliers,
  formatDate,
  roundPrice,
  truthy,
} from "@/constants";


import React from "react";
import Example from "../DemoChart";
import Link from "next/link";
import Image from "next/image";
import { deletePriceById } from "@/lib/actions/price.actions";
import AlertDialogue from "./AlertDialogue";

const Price = ({ item, prices, username }) => {
  const truty = truthy(prices);
  // console.log("item =", item.name);
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
        {item &&
          item.prices.map((price) => (
            <div className="flex " key={price.userName}>
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
                {username === price.userName && (
                  // <p className="text-red-500">Del</p>
                  <AlertDialogue priceId={price.id}  />
       
                )}
              </h6>
              <div className="flex-1 flex">
                {formatDate(price.updatedAt)}
                {username === price.userName && (
                  <Link href={`/edit/${price.id}`} key={price.userName}>
                    <Image
                      src="/assets/edit.svg"
                      alt="add"
                      width={20}
                      height={20}
                    />
                  </Link>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Price;
