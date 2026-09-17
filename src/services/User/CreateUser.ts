import { Prisma, User } from "@prisma/client";
import { prisma } from "../../core/prisma";
import { userAlreadyExistsError } from "../Errors/AuthErrors";


export class createUserUseCase{
    async execute(data:Prisma.UserCreateInput):Promise<User>{
        const doesTheEmailAlreadyExists = await prisma.user.findUnique({
            where:{
                email:data.email
            }
        })

        if(doesTheEmailAlreadyExists){
            throw new userAlreadyExistsError()
        }

        const response = await prisma.user.create({
            data
        })
        return response
    }
}