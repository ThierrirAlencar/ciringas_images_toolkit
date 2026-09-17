import z from "zod";
import { ImageDoesNotExistsOnDatabase } from "../../../services/Errors/ImageErrors";
import { getImageById } from "../../../services/Images/getImage";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getImage(req:FastifyRequest, res:FastifyReply){
    const { image_id } = z.object({
        image_id:z.number().int().positive()
    }).parse(req.params);

    const service = new getImageById()

    try{
        const image = await service.execute(image_id)
        return res.status(200).send({
            description:"Image retrieved successfully",
            data: {
                image: image
            }
        })
    }catch(err){
        if(err instanceof ImageDoesNotExistsOnDatabase){
            return res.status(404).send({
                description: err.message,
                error: err.name
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