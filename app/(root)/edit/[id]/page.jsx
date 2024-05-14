import EditPrice from "@/components/forms/EditPrice";
import Price from "@/components/forms/Price";
import { fetchPriceById } from "@/lib/actions/price.actions";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

const Page = async ({ params }) => {
  const user = await currentUser()
 const userInfo = await fetchUser(user.id)
  const item = await fetchPriceById(parseFloat(params.id));
  const canEdit = item.userName === userInfo.username
  const itemName = item.itemName;
  const price = item.value;
  const category = item.category;
  const id = item.id;


  return (
    <section className="flex flex-col gap-10">
      <h4 className="head-text">Edit {!itemName && "item & "}Price</h4>
      <EditPrice params={itemName} price={price} id={id} canEditName={canEdit} />
    </section>
  );
};

export default Page;
