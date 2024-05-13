import Price from "@/components/forms/Price";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";


const Page = async ({params}) => {
  const itemName = (params.id?.[0] ?? '').replace(/%20/g, " ");
  console.log(itemName)
  console.log(params)
  const user = await currentUser()
  const userInfo = await fetchUser(user.id)
  console.log({userInfo})


  return (
    <section className="flex flex-col gap-10">
      <h4 className="head-text">Add {!itemName && 'item & '}Price</h4>
      <Price params={itemName} userId={userInfo.id}/>
   
    </section>
  );
};

export default Page;
