import { Image, Prisma } from "@prisma/client";
import { prisma } from "../../core/prisma";
import { userNotFoundError } from "../Errors/AuthErrors";

export class createImageUseCase{
    async execute(data:Prisma.ImageUncheckedCreateInput):Promise<Image>{
        const image = await prisma.image.create({
            data
        })
        if(!image){
            throw new userNotFoundError()
        }

        return image
    }
}