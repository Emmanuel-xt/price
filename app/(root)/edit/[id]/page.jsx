import EditPrice from "@/components/forms/EditPrice";
import Price from "@/components/forms/Price";
import { fetchPriceById } from "@/lib/actions/price.actions";

const Page = async ({ params }) => {
  const item = await fetchPriceById(parseFloat(params.id));
  const itemName = item.itemName;
  const price = item.value;
  const category = item.category;
  const id = item.id;
  console.log({ id });

  return (
    <section className="flex flex-col gap-10">
      <h4 className="head-text">Edit {!itemName && "item & "}Price</h4>
      <EditPrice params={itemName} price={price} id={id} />
    </section>
  );
};

export default Page;
