import { FastifyReply, FastifyRequest } from "fastify";
import { getUserUseCase } from "../../../services/User/getUser";
import { getUsersUseCase } from "../../../services/User/getUsers";

export async function getManyUserController(req:FastifyRequest, res:FastifyReply){
    const service = new getUsersUseCase()

    try{
        const _get = await service.execute();

        res.status(200).send({
            description:"Successfully returned user list",
            body:_get
        })
    }catch(err){
        res.status(500).send({
            error:err
        })
    }
}