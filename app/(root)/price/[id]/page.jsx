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

const page = async ({ params }) => {
  if (!params.id) return null;
  const item = await fetchItemByName(params.id);
  const array = (item) => (

    item.prices = item.prices.map((price) => price.value)
  )
  const prices = array(item)
  console.log('array=' , prices)


  console.log('item =' , item)
  return (
    <div>
      <Tabs defaultValue="Price" className=" bg-transparent  ">
        <div className="border-b border-b-slate-700 sticky top-14  bg-dark-1 ">
          <h6 className="font-extrabold">
            {params.id}/{item?.categoryName}
          </h6>
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
        </div>
        <TabsContent value="Price" className="w-full text-light-1">
          <Price item={item} prices={prices} />
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
