import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HomeCategories,
  InfoCategories,
  calculateAverage,
  filterOutliers,
  roundPrice,
  // studentItems,
} from "@/constants";
import { getAllItems } from "@/lib/actions/price.actions";
import Image from "next/image";
import React from "react";

const Home = async () => {
  const studentItems = await getAllItems();
  // console.log('students items =' , studentItems)
  return (
    <section className="flex flex-col  w-full">
      <div className="mt-4 w-full">
        <Tabs defaultValue="Educational" className=" bg-transparent ">
          <TabsList className="tab overflow-x-auto bg-transparent">
            {HomeCategories.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className=" bg-transparent focus:bg-transparent data-[state=active]:bg-white"
              >
                <p className="max-sm:text-xsm">{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {HomeCategories.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1"
            >
              {/* tabs description */}
              <div className="flex w-full justify-between px-2 text-slate-400 mb-5">
                <div className="flex gap-4 items-center">
                  <h5 className=" sm:text-xsm  ">name</h5>
                  <p className="text-[8px]">/ qty</p>
                </div>
                <div className="flex gap-3">
                  <p className="text-[9px] ">avg </p>
                  <p className=" px-6">price</p>
                </div>
              </div>

              <div className=" m-1 flex flex-col gap-3 ">
                {studentItems?.map(
                  (item) =>
                    item.categoryName === tab.value && (
                      <div
                        className="flex w-full justify-between hover:bg-dark-4 cursor-pointer rounded-md p-1"
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

      <div className="mt-4 w-full">
        <Tabs defaultValue="Shops" className=" bg-transparent ">
          <TabsList className=" justify-between w-full overflow-x-auto bg-transparent ">
            {InfoCategories.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className=" bg-transparent focus:bg-transparent data-[state=active]:bg-transperent data-[state=active]:text-white text-slate-400 data-[state=active]:border-b-2"
              >
                <p className="max-sm:text-xsm">{tab.label}</p>
              </TabsTrigger>
            ))}
          </TabsList>
          {HomeCategories.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1"
            >
              {/* @ts-ignore */}
              {/* Fetch Items from database according to category */}
              <div className=" m-1 flex flex-col gap-3">
                {studentItems.map(
                  (item) =>
                    item.category === tab.value && (
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
                        <p className="btn">{item.price}</p>
                      </div>
                    )
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="">
        <h4 className="">Posts</h4>
      </div>
    </section>
  );
};

export default Home;
