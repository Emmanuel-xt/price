"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PriceCategories } from "@/constants";
import { itemValidation } from "@/lib/validations/price";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  addDummyData,
  addItemWithPrices,
  createUser,
  getAllItems,
  updatePriceById,
} from "@/lib/actions/price.actions";
import { useRouter } from "next/navigation";
// import { createUser } from "@/lib/actions/user.action";

const EditPrice = ({ params, price, id }) => {
  const router = useRouter();
  // const item = params.replace(/%20/g, " ")

  const [itemName, setItemName] = useState("");
  const [searchValue, setSearchValue] = useState(`${params}`);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  const studentItems = [];

  // useForm hook from react-hook-form
  const form = useForm({
    resolver: zodResolver(itemValidation),
    defaultValues: {
      itemName: params,
      category: "",
      unit: "",
      price: price || "",
    },
  });

  // Function to handle input change and filter items
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    console.log("v", inputValue);
    setSearchValue(inputValue);
    const filtered = studentItems?.filter((item) =>
      item.name.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setFilteredItems(filtered);
    setDropdownOpen(true); // Open the dropdown when input changes

    // Manually update the form library's value for itemName
    form.setValue("itemName", inputValue);
  };

  // Function to handle item selection
  const handleItemSelection = (itemName) => {
    setSearchValue(itemName); // Set search value to clicked item
    setItemName(itemName);
    setDropdownOpen(false); // Close the dropdown when item is selected
    const filtered = studentItems.filter((item) =>
      item.name.toLowerCase().startsWith(itemName.toLowerCase())
    );
    setFilteredItems(filtered);

    // Manually update the form library's value for itemName
    form.setValue("itemName", itemName);
  };

  const onSubmit = async (values) => {
    try {
      const success = updatePriceById({
        newPrice: values.price,
        id: id,
      });
      // addDummyData();
      if (success) {
        // router.push("/price");
      }
    } catch (error) {
      return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 ">
              <FormLabel className="">Name</FormLabel>
              <div className="flex flex-col gap-3 items-">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Name of Item"
                    className="bg-dark-1 border-primary-500 outline-primary-500 md:max-w-[50%]"
                    value={searchValue}
                    disabled={params && true}
                    onChange={handleInputChange}
                    // {...field}
                  />
                </FormControl>
                <FormMessage />
                {dropdownOpen && (
                  <div className="">
                    {searchValue.length > 0 && (
                      <ul className=" z-10 shadow-md border  bg-dark-1 border-primary-500 outline-primary-500 w-full md:max-w-[50%]">
                        {filteredItems.map((item) => (
                          <li
                            key={item.name}
                            className="bg-dark-1 hover:bg-slate-500 relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-slate-200 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 "
                            onClick={() => handleItemSelection(item.name)}
                          >
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </FormItem>
          )}
        />
        <div className="flex gap-6">
          <FormField
            control={form.control}
            name="price"
            className="flex gap-4"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder=" Price"
                    className="bg-dark-1 border-primary-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[10px] " />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unit"
            className="flex gap-4"
            render={({ field }) => (
              <FormItem className="flex gap-3 items-center">
                <FormLabel>Unit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Quantity "
                    className="bg-dark-1 border-primary-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[10px] " />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[180px] bg-dark-1 border-primary-500 outline-none">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-dark-1  text-white border-primary-500 ">
                  {PriceCategories.map((category) => (
                    <SelectItem
                      key={category.label}
                      value={category.label}
                      className="hover:bg-dark-3"
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Edit
        </Button>
      </form>
    </Form>
  );
};

export default EditPrice;
