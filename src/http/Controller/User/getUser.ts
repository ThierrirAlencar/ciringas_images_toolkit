import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { getUserUseCase } from "../../../services/User/getUser";
import { describe } from "node:test";
import * as authErrors from "../../../services/Errors/AuthErrors";

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
        if(err instanceof authErrors.userNotFoundError){
            res.status(404).send({
                description:"User not found",
                body:null
            })
        }else{
            res.status(500).send({
                description:"Internal server error",
                body:null
            })
        }
    }
}