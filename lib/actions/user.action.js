'use server'

import prisma from "@/prisma/prisma"

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