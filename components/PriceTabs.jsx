"use client";

import React, { useEffect, useState } from "react";
import Searchbar from "@/components/shared/Searchbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HomeCategories,
  InfoCategories,
  PriceCategories,
  filterOutliers,
  roundPrice,
  // studentItems,
} from "@/constants";

const PriceTabs = ({ studentItems , searchParams }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <div className="mt-4 w-full">
        <div className="sticky top-14">
          <Searchbar routeType="price" className="" />
        </div>
        <Tabs defaultValue="All" className=" bg-transparent ">
          <TabsList className="sticky top-24 bg-transperent  backdrop-blur-lg  justify-between w-full overflow-x-auto overflow-y-hidden ">
            {PriceCategories.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className=" bg-transparent focus:bg-transparent data-[state=active]:bg-transperent data-[state=active]:text-white text-slate-400 data-[state=active]:border-b-2"
              >
                <p className="max-sm:text-xsm">{tab.label}</p>

                {/* {tab.label === "All" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo.threads.length}
                  </p>
                )} */}
              </TabsTrigger>
            ))}
          </TabsList>
          {PriceCategories.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1"
            >
              {/* @ts-ignore */}
              {/* Fetch Items from database according to category */}
              <div className=" m-1 flex flex-col gap-3">
                {studentItems
                  ?.filter((item) => {
                    if (searchParams.q) {
                      return item.name
                        .toLowerCase()
                        .startsWith(searchParams.q.toLowerCase());
                    } else {
                      return true; // Return true to include all items when searchParams.q is not present
                    }
                  })
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(
                    (item) =>
                      (item.categoryName === tab.value ||
                        tab.value === "All") && (
                        <div
                          className="flex w-full justify-between"
                          key={item.name}
                        >
                          <div className="flex gap-4 items-center">
                            <h5 className="text-white sm:text-xsm  ">
                              {item.name}
                            </h5>

                            <p className="text-[8px] bg-slate-900 p-[1px]">
                              {item.qty}x
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <p className="text-[9px] font-extralight">
                              {filterOutliers(item.prices)}
                            </p>

                            <p className="btn py-1">
                              {roundPrice(filterOutliers(item.prices))}
                            </p>
                          </div>
                        </div>
                      )
                  )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default PriceTabs;
