import { FastifyReply, FastifyRequest } from "fastify";
import { getImagesService } from "../../../services/Images/getImages";
import { jwtUser } from "../../../@types/Fastify-jwt";
import { userNotFoundError } from "../../../services/Errors/AuthErrors";

export async function getImages(req:FastifyRequest, res:FastifyReply){
    const service = new getImagesService();

    const jwt_decode = await req.jwtDecode() as jwtUser;
    const user_id = jwt_decode.sub   

    try{
        const response = await service.execute(user_id)
        return res.status(200).send({
            description:"Images retrieved successfully",
            data: {
                images: response
            }
        })
    }catch(err){
        if(err instanceof userNotFoundError){
            return res.status(404).send({
                description: err.message,
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