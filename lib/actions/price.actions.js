"use server";

import prisma from "@/prisma/prisma";
import { addIssueToContext } from "zod";

export async function createUser() {
  console.log("about to run create user function");
  try {
    const user = await prisma.user.createMany({
      data: [
        { name: "Emma_Js" },
        { name: "Arinzechukwu" },
        { name: "Emmanuel" },
      ],
    });
    console.log("User created succefully", user);
  } catch (error) {
    console.log("error creating user", error);
  }
}

export async function addItemWithPrices({ itemName, category, price, userId }) {
  console.log("about to run add item with price function");
  // console.log('values' , {itemName,category,price,userId})
  const priceValue = parseFloat(price);

  try {
    // First, create the item
    const newItem = await prisma.item.upsert({
      where: { name: itemName },
      create: {
        name: itemName,
        category: {
          connectOrCreate: {
            where: { name: category },
            create: { name: category },
          },
        },
      },
      update: {},
    });
    console.log("Item upserted successfully", newItem);

    // Next, add the prices for the item
    await prisma.price.create({
      data: {
        value: priceValue,
        item: { connect: { id: newItem.id } },
        user: { connect: { id: userId } },
      },
    });
    console.log(
      `Item '${itemName}' with prices '${price}' added successfully. 🤝`
    );
    return true;
  } catch (error) {
    console.error("Error adding item with prices:", error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

const itemsData = [
  {
    category: "Gadgets",
    name: "Wireless Mouse",
    prices: [800, 805, 810, 815, 820, 825, 800, 810, 90],
    qty: 1,
  },
  {
    category: "Wears",
    name: "Flip-flops",
    prices: [500, 505, 510, 515, 520, 525],
    qty: 1,
  },
  {
    category: "Toiletries",
    name: "Toilet Paper (Pack of 4)",
    prices: [200, 205, 210, 215, 220, 225],
    qty: 1,
  },
  {
    category: "Food",
    name: "Eggs (Dozen)",
    prices: [400, 405, 410, 415, 420, 425],
    qty: 1,
  },
];

export async function addDummyData() {
  for (const item of itemsData) {
    await addItemWithPrices({
      itemName: item.name,
      category: item.category,
      price: item.prices[0],
      userId: 22,
    });
  }
  console.log("All checks have passed , Items added succedfully ,Enjoy 🥳");
}

export const getAllItems = async () => {
  console.log("Fetching all Items 🙏");
  try {
    const items = await prisma.Item.findMany({
      // where  : {
      //   categoryName : 'Gadgets'
      // },
      include: {
        // name : true,
        // categoryName: true,
        prices: {
          select: {
            value: true,
          },
        },
      },
    });

    items.forEach((item) => {
      item.prices = item.prices.map((price) => price.value);
    });

    console.log("All Items fetched succefully  ✅ ✅ ✅");
    return items;
  } catch (error) {
    console.log("Error fetching all items 😞", error);
  }
};

export const fetchItemByName = async (id) => {
  console.log("Fetching item with id :", id);
  try {
    const item = await prisma.item.findUnique({
      where: {
        name: id,
      },
      include: {
        prices: {
          select: {
            value: true,
            userName: true,
            id: true,
          },
        },
      },
    });

    console.log("Yeah , item was found 😇", item);
    return item;
  } catch (error) {
    console.log("item with id:", id, "was not found");
  }
};

export const fetchPriceById = async (id) => {
    console.log('trying to fetch price with id =' , id)
    try {
      const price = await prisma.price.findUnique({
        where : {
          id : id,
        },
      })
      console.log('price =' , price)
      return price
    } catch (error) {
      console.log('error fetching ' , error)
    }
  }
  
  export const updatePriceById = async ({newPrice , id}) => {
    console.log('trying to update price with id =' , id ,'📝')
    try {
      const value = parseFloat(newPrice)
      const price = await prisma.price.update({
        where : {
          id : id
        },
        data : {
          value : value
        }
      })
      console.log('update succesful =' , price)
      return true
    } catch (error) {
      return false
      console.log('error updating ' , error)
    }
    
}