'use server'

import prisma from "@/prisma/prisma"

export async function createUser(){
    console.log('about to run create user function')
    try {
        const user = await prisma.user.createMany({
            data: [
                {name : 'emma_js'},
                {name : 'emma_js2'},
                {name : 'emma_js3'},
    
            ]
        })
        console.log('User created succefully' , user)
        
    } catch (error) {
        console.log('error creating user' , error)
    }
}