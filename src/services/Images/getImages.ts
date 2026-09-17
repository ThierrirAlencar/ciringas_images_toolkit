import { Image } from "@prisma/client";
import {userNotFoundError} from "../Errors/AuthErrors";
import {prisma} from "../../core/prisma";

export class getImagesService {
    async execute(user_id:string): Promise<Image[]>{
        const doesTheUserExists = await prisma.user.findUnique({
            where:{
                id:user_id
            }
        })
        if(!doesTheUserExists){
            throw new userNotFoundError()
        }
        
        return await prisma.image.findMany({
            where:{
                userId:user_id
            }
        })
    }
}