import { Image, Prisma } from "@prisma/client";
import { prisma } from "../../core/prisma";
import { error } from "console";
import { userNotFoundError } from "../Errors/AuthErrors";

export class createImageUseCase{
    async execute(data:Prisma.ImageUncheckedCreateInput):Promise<Image>{
        const doesTheUserExists = await prisma.image.create({
            data
        })
        if(!doesTheUserExists){
            throw new userNotFoundError()
        }

        return await prisma.image.create({
            data
        })
    }
}