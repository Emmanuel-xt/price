'use server'

import prisma from "@/prisma/prisma"

export async function addItem({
    itemName , price , category , unit
}){
    console.log({itemName , price , category , unit})
}

export async function getPosts(){
    const posts = await prisma.post.findMany({
        where : {published : true},
        include : {
            author : {
                select : {name : true}
            }
        }
    })
    return posts
}

// export async function addPost()({})