"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

// import { Input } from "../ui/input";


function Searchbar( {routeType} ) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // query after 0.3s of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/${routeType}?q=` + search);
      } else {
        router.push(`/${routeType}`);
      }
    }, 50);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType]);

  return (
    <div className=' flex gap-1 rounded-lg bg-dark-3 px-4 py-1 md:py-2'>
      <Image
        src='/assets/search-gray.svg'
        alt='search'
        width={24}
        height={24}
        className='object-contain'
      />
      <Input
        id='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`${
          routeType !== "/price" ? "Search Item" : "Search Items"
        }`}
        className='no-focus  border-none bg-dark-3 text-base-regular text-light-4 outline-none'
      />
    </div>
  );
}

export default Searchbar;