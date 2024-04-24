import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomeCategories } from "@/constants";
import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <section className="flex flex-col  w-full">
      <div className="mt-4 w-full">
        <Tabs defaultValue="favorite" className=" bg-transparent ">
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
              {/* @ts-ignore */}
              {/* Fetch Items from database according to category */}
              hello World
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Home;
