'use server'

import prisma from "@/prisma/prisma"

export async function addItem({
    itemName , price , category , unit
}){
    console.log({itemName , price , category , unit})
}

export async function createUser(){
  console.log('about to run create user function')
  try {
      const user = await prisma.user.createMany({
          data: [
              {name : 'Emma_Js'},
              {name : 'Arinzechukwu'},
              {name : 'Emmanuel'},
  
          ]
      })
      console.log('User created succefully' , user)
      
  } catch (error) {
      console.log('error creating user' , error)
  }
}

export async function addItemWithPrices({itemName,category,price,userId}) {
    console.log('about to run add item with price function')
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
      console.log('Item upserted successfully' , newItem);

      
      // Next, add the prices for the item
      await prisma.price.create({
        data: {
          value: priceValue,
          item: { connect: { id: newItem.id } },
          user: { connect: { id: userId } }, 
        },
      });
      console.log('new item s price created succefully' , price)
      
      console.log(`Item '${itemName}' with prices added successfully.`);
    } catch (error) {
      console.error('Error adding item with prices:', error);
    } finally {
      await prisma.$disconnect();
    }
  }

  const itemsData = [
    { category: "Gadgets", name: "Wireless Mouse", prices: [800, 805, 810, 815, 820, 825 ,800 , 810,90 ,], qty: 1 },
    { category: "Wears", name: "Flip-flops", prices: [500, 505, 510, 515, 520, 525], qty: 1 },
    { category: "Toiletries", name: "Toilet Paper (Pack of 4)", prices: [200, 205, 210, 215, 220, 225], qty: 1 },
    { category: "Food", name: "Eggs (Dozen)", prices: [400, 405, 410, 415, 420, 425], qty: 1 }
    
  ];

// Add dummy data using addItemWithPrices function
export async function addDummyData() {
    for (const item of itemsData) {
        await addItemWithPrices({
            itemName: item.name,
            category: item.category,
            price: item.prices[0], // Assuming each item has only one price for simplicity
            userId: 22, // Assuming userId is 4 as mentioned earlier
        });
    }
    console.log('All checks have passed , Items added succedfully ,Enjoy 🥳')
}

// export async function addPost()({})