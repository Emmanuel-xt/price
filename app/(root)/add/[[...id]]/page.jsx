import Price from "@/components/forms/Price";


const Page = ({params}) => {
  const itemName = (params.id?.[0] ?? '').replace(/%20/g, " ");
  console.log(itemName)
  console.log(params)


  return (
    <section className="flex flex-col gap-10">
      <h4 className="head-text">Add {!itemName && 'item & '}Price</h4>
      <Price params={itemName} />
   
    </section>
  );
};

export default Page;
