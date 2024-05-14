import { fetchItemByName } from "@/lib/actions/price.actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ItemTabs,
  PriceCategories,
  filterOutliers,
  roundPrice,
  studentItems,
} from "@/constants";
import Link from "next/link";
import Price from "@/components/tabs/Price";
import Info from "@/components/tabs/Info";
import Slashed from "@/components/tabs/Slashed";
import { CrossIcon } from "lucide-react";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.action";

const page = async ({ params }) => {
  const user = await currentUser()
 const  userInfo = await fetchUser(user.id)
//  console.log({userInfo})

  const itemName = params.id.replace(/%20/g, " ");
  if (!params.id) return null;
  const item = await fetchItemByName(itemName);
  // console.log({item})

  const array = (item) => item.prices.map((price) => price.value);

  const prices = array(item);

  const newItem = JSON.parse(JSON.stringify(item));

  newItem.prices = prices;


  // console.log('array=', prices);
  // console.log('item =', item);
  // console.log('newItem =', newItem);
  return (
    <div>
      <Tabs defaultValue="Price" className=" bg-transparent  ">
        <div className="border-b border-b-slate-900 sticky top-14  bg-dark-1 ">
          <h6 className="font-extrabold">
            {itemName}/{item?.categoryName}
          </h6>
          <div className="flex items-center justify-between flex-">
            <TabsList className="bg-transperent items-start text-left  backdrop-blur-lg overflow-x-auto overflow-y-hidden ">
              {ItemTabs.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className=" bg-transparent focus:bg-transparent data-[state=active]:bg-transperent data-[state=active]:text-white text-slate-400 data-[state=active]:border-b-2"
                >
                  <p className="max-sm:text-xsm">{tab}</p>
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex gap-2">
            <Link href={`/add/${itemName}`} className=" bg-primary-500 p-1 rounded-md flex items-center">
              <Image src="/assets/add.svg" alt="add" width={20} height={20} />
            </Link>

            </div>
          </div>
        </div>
        <TabsContent value="Price" className="w-full text-light-1">
          <Price item={item} prices={prices} username={userInfo.username} />
        </TabsContent>
        <TabsContent value="Info" className="w-full text-light-1">
          <Info />
        </TabsContent>
        <TabsContent value="Slashed" className="w-full text-light-1">
          <Slashed />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
