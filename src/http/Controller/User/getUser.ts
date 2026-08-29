import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { getUserUseCase } from "../../../services/User/getUser";
import { describe } from "node:test";


export async function getUniqueUserController(req:FastifyRequest, res:FastifyReply){
    const {id} = z.object({
        id:z.string().uuid()
    }).parse(req.params)

    const service = new getUserUseCase()

    try{
        const _get = await service.execute(id);

        res.status(200).send({
            description:"Successfully returned user",
            body:_get
        })
    }catch(err){
        res.status(500).send({
            error:err
        })
    }
}