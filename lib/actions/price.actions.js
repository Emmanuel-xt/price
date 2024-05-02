'use server'

import prisma from "@/prisma/prisma"

export async function addItem({
    itemName , price , category , unit
}){
    console.log({itemName , price , category , unit})
}


export async function addItemWithPrices({itemName,category,price,userId}) {
    console.log('about to run add item with price function')
    const priceValue = parseFloat(price);
    console.log('price value =' , itemName, category, price ,userId)
    console.log('price value =' , priceValue)

    try {
      // First, create the item
      const newItem = await prisma.item.create({
        data: {
          name: itemName,
          category: {
            connectOrCreate: {
              where: { name: category },
              create: { name: category },
            },
          },
        },
      });
      console.log('new item created succefully')
      
      // Next, add the prices for the item
      await prisma.price.create({
        data: {
          value: priceValue,
          item: { connect: { id: newItem.id } },
          user: { connect: { id: userId } }, 
        },
      });
      console.log('new item s price created succefully')
      
      console.log(`Item '${itemName}' with prices added successfully.`);
    } catch (error) {
      console.error('Error adding item with prices:', error);
    } finally {
      await prisma.$disconnect();
    }
  }


// export async function addPost()({})