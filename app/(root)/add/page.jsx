"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PriceCategories, studentItems } from "@/constants";

const Page = () => {
  const [itemName, setItemName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  // Function to handle input change and filter items
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
    const filtered = studentItems.filter((item) =>
      item.name.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setFilteredItems(filtered);
    setDropdownOpen(true); // Open the dropdown when input changes
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
  };

  return (
    <section className="flex flex-col gap-10">
      <h4 className="head-text">Add Item/Price</h4>
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-col gap-3 items-">
          <label>Name</label>
          <Input
            type="text"
            placeholder="Name of Item"
            className="bg-dark-1 border-primary-500 outline-primary-500 md:max-w-[50%]"
            value={searchValue}
            onChange={handleInputChange}
          />
        {dropdownOpen && (
          <div className="">
            {searchValue.length > 0 && (
              <ul className=" z-10 shadow-md border  bg-dark-1 border-primary-500 outline-primary-500 w-full">
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
      </div>
      <div className="flex gap-4">
        <div className="flex gap-3 items-center">
          <h4>Price</h4>
          <Input
            type="number"
            placeholder=" Price"
            className="bg-dark-1 border-primary-500"
          />
        </div>
        <div className="flex gap-3 items-center">
          <h4>Unit</h4>
          <Input
            type="number"
            placeholder="Quantity "
            className="bg-dark-1 border-primary-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <h4>Category:</h4>
        <Select>
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
      </div>
      <Button type="submit" className="bg-primary-500">
        Add
      </Button>
    </section>
  );
};

export default Page;
