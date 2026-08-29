import { Image, User } from "@prisma/client";
import { prisma } from "../../lib/prisma";


interface safeUser {
    email:string,
    username:string | null,
    created_at:Date,
    updated_at:Date | undefined,
    deleted_at:Date | null, 
    imageList:Image[]
}

export class getUserUseCase {
    async execute(id:string):Promise<safeUser>{
        const doesTheUserExists = await prisma.user.findUnique({
            where:{
                id
            }
        })
        
        if(!doesTheUserExists){
            throw new Error("User does not exits")
        }

        const imageList = await prisma.image.findMany({
            where:{
                userId:id
            }
        })

        const { created_at,deleted_at,email,updated_at,username} = doesTheUserExists
        
        return {
            created_at,
            deleted_at,
            email,
            updated_at,
            username,
            imageList
        }
    }
}