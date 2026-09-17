import { FastifyReply, FastifyRequest } from "fastify";
import { jwtUser } from "../../../@types/Fastify-jwt";
import { getImageBase64WithLoginUseCase } from "../../../services/Images/getImageWithBase64WithLoginUseCase";
import z from "zod";
import * as imageErrors from "../../../services/Errors/ImageErrors";
import * as minIOErros from "../../../services/Errors/MinIOErrors";


export async function getImageBase64WithLogin(req:FastifyRequest, res:FastifyReply){
    
    const { image_id } = z.object({
        image_id:z.number().int().positive()
    }).parse(req.body);
    
    const jwt_decode = await req.jwtDecode() as jwtUser;
    const user_id = jwt_decode.sub   
    const service = new getImageBase64WithLoginUseCase()

    try{
        const imageBase64 = await service.execute(image_id, user_id)
        return res.status(200).send({
            description:"Image retrieved successfully",
            data: {
                base64: imageBase64
            }
        })

    }catch(err){
        if(err instanceof imageErrors.ImageNotFoundError){
            return res.status(404).send({
                description: err.message,
                error: err.name
            })
        }else if(err instanceof imageErrors.ImageUnauthorizedError){
            return res.status(403).send({
                description: err.message,
                error: err.name
            })
        }else if(err instanceof minIOErros.unableToGetImageError){ 
            return res.status(500).send({
                name: err.name,
                description: err.message,
                error: err,
            })
        }else{
            return res.status(500).send({
                name: "InternalServerError",
                description: "An unexpected error occurred.",
                error: err,
            })
        }
    }
}