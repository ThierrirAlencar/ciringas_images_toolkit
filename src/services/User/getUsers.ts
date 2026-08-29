import { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";


interface unsafeUser {
    id:string,
    email:string,
    username:string | null,
    created_at:Date,
    updated_at:Date | undefined,
    deleted_at:Date | null, 
}

export class getUsersUseCase {
    async execute():Promise<unsafeUser[]>{
        return await prisma.user.findMany({
            select:{
                id:true,password:false,email:true,created_at:true,deleted_at:true,updated_at:true,username:true
            }
        })
    }
}