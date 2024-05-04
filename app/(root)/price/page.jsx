import PriceTabs from "@/components/PriceTabs";
import { getAllItems } from "@/lib/actions/price.actions";
import Image from "next/image";

const page = async ({ searchParams }) => {
  // const [studentItems, setStudentItems] = useState();
  const items = await getAllItems();
  try {
    console.log("items =", items);
  } catch (error) {
    console.error("Error fetching items:", error);
  }

  return (
    <div>
      {items.length === 0 ? (
        <p className="">Nothing FOund</p>
      ) : (
        <PriceTabs studentItems={items} searchParams={searchParams} />
      )}
    </div>
  );
};

export default page;
