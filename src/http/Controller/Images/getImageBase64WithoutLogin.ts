import { FastifyReply, FastifyRequest } from "fastify";
import { jwtUser } from "../../../@types/Fastify-jwt";
import { getImageBase64WithLoginUseCase } from "../../../services/Images/getImageBase64WithoutLogin";
import z from "zod";
import * as imageErrors from "../../../services/Errors/ImageErrors";
import * as minIOErros from "../../../services/Errors/MinIOErrors";


export async function getImageWithoutLogin(req:FastifyRequest, res:FastifyReply){
    
    const { image_url } = z.object({
        image_url:z.string()
    }).parse(req.body);
    
    const service = new getImageBase64WithLoginUseCase()

    try{
        const imageBase64 = await service.execute(image_url)
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
                const isMissingObject = /NoSuchKey|not exist|not found/i.test(err.message);
                return res.status(isMissingObject ? 404 : 500).send({
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