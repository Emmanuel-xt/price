"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PriceCategories, engineeringDepartments } from "@/constants";

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
import { useRouter } from "next/navigation";
import { userValidation } from "@/lib/validations/user";
import { createUser } from "@/lib/actions/user.action";

// import { createUser } from "@/lib/actions/user.action";

const Onboarding = ({ user , next  }) => {
  const router = useRouter();



  // const next = router.back
  const handleBack = () => {
    router.back()
  }

  // const item = params.replace(/%20/g, " ")

  // useForm hook from react-hook-form
  const form = useForm({
    resolver: zodResolver(userValidation),
    defaultValues: {
      fullname: user.fullname || "",
      username: user.username || "",
      department: user.department || "",
      level: user.level || "",
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

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true)

  const onSubmit = async (values) => {
    setLoading(true)
    try {
      const create = await createUser({
        id: user.id,
        email: user.email,
        fullname: values.fullname ,
        username: values.username,
        department: values.department,
        level: values.level,
        createdAt: user.createdAt,
        gender: user.gender ? user.gender : "",
      });
      if (create) {
        router.push(`/${next}`);
      } else {
        setError("Onboarding failed ");
      }
    } catch (error) {
      console.log("Error registering user at the database", error);
    }

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 ">
              <FormLabel className="">Full Name</FormLabel>
              <div className="flex flex-col gap-3 items-">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your full name "
                    className="bg-dark-1 border-primary-500 outline-primary-500 md:max-w-[50%]"
                    // disabled={params && true}
                    onChange={handleInputChange}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 ">
              <FormLabel className="">Username</FormLabel>
              <div className="flex flex-col gap-3 items-">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your unique username"
                    className="bg-dark-1 border-primary-500 outline-primary-500 md:max-w-[50%]"
                    // disabled={params && true}
                    onChange={handleInputChange}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Department</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="md:max-w-[50%] bg-dark-1 border-primary-500 outline-none">
                  <SelectValue
                    placeholder="Select your department"
                    className="placeholder:text-slate-900"
                  />
                </SelectTrigger>
                <SelectContent className="bg-dark-1  text-white border-primary-500 ">
                  {engineeringDepartments.map((department) => (
                    <SelectItem
                      key={department}
                      value={department}
                      className="hover:bg-dark-3"
                    >
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="md:max-w-[50%] bg-dark-1 border-primary-500 outline-none">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent className="bg-dark-1  text-white border-primary-500 ">
                  {[
                    "100",
                    "200",
                    "300",
                    "400",
                    "500",
                    "600",
                    "I am a graduate 😁",
                    "I am not a student",
                  ].map((level) => (
                    <SelectItem
                      key={level}
                      value={level}
                      className="hover:bg-dark-3"
                    >
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-red-500">{error && error}</p>
        <Button type="submit" className="bg-primary-500">
          Continue
        </Button>
        <p className="" onClick={handleBack}>Return</p>
      </form>
    </Form>
  );
};

export default Onboarding;
