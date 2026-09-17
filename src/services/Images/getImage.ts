import { Image } from "@prisma/client";
import { prisma } from "../../core/prisma";
import { ImageDoesNotExistsOnDatabase } from "../Errors/ImageErrors";


export class getImageById{
    async execute(image_id:number): Promise<Image>{
        const image = await prisma.image.findUnique({
            where:{
                id:image_id
            }
        })
        if(!image){
            throw new ImageDoesNotExistsOnDatabase("Image does not exist in the database!")
        }
        return image;
    }
}