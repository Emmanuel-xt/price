import Price from "@/components/forms/Price";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


const Page = async ({params}) => {
  const user = await currentUser()
  const userInfo = await fetchUser(user.id)
  if(!userInfo){
    redirect('/onboarding')
  }
  const itemName = (params.id?.[0] ?? '').replace(/%20/g, " ");
  console.log(itemName)
  console.log(params)
  console.log({userInfo})


  return (
    <section className="flex flex-col gap-10">
      <h4 className="head-text">Add {!itemName && 'item & '}Price</h4>
      <Price params={itemName} userInfo={userInfo}/>
   
    </section>
  );
};

export default Page;
