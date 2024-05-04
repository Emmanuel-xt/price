
import PriceTabs from "@/components/PriceTabs";
import { getAllItems } from "@/lib/actions/price.actions";
import Image from "next/image";

const page = async ({ searchParams }) => {
  // const [studentItems, setStudentItems] = useState();
  try {
    const items = await getAllItems();
    console.log("items =", items);
  } catch (error) {
    console.error("Error fetching items:", error);
  }
  
  return (
    <div>
    <PriceTabs studentItems={items} searchParams={searchParams} />
    </div>
  );
};

export default page;
