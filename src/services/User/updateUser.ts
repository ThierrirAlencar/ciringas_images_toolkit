
import { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";

interface updateUser {
    email:string | undefined
    username:string | undefined,
    password:string | undefined,
}

export class updateUserUseCase {
    async execute(id:string, data:updateUser):Promise<Partial<User>>{
        const doesTheUserExists = await prisma.user.findUnique({
            where:{
                id
            }
        })

        if(!doesTheUserExists){
            throw new Error("User does not exists")
        }

        const update = await prisma.user.update({
            where:{
                id
            },
            data,
            select:{
                id:false,username:true,email:true,password:true,updated_at:true
            }
        })

        return update;
    }
}