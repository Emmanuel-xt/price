import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const page = () => {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex gap-3 items-center">
        <h4>Name</h4>
        <Input
          type="text"
          placeholder='Name of Item'
          className="bg-dark-1 border-primary-500 outline-primary-500 md:max-w-[50%]"
        />
      </div>
      <div className="flex gap-4">
        <div className="flex gap-3 items-center">
          <h4>Price</h4>
          <Input type="number" placeholder=' Price' className="bg-dark-1 border-primary-500" />
        </div>
        <div className="flex gap-3 items-center">
          <h4>Unit</h4>
          <Input type="number" placeholder='Quantity 'className="bg-dark-1 border-primary-500" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <h4 className="">Category : </h4>
        <Select>
          <SelectTrigger className="w-[180px] bg-dark-1 border-primary-500 outline-none">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-dark-1  text-white border-primary-500 ">
            <SelectItem value="light" className="hover:bg-dark-3">
              Light
            </SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="bg-primary-500">
         Add
        </Button>
    </section>
  );
};

export default page;
