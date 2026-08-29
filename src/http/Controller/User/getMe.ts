import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { getUserUseCase } from "../../../services/User/getUser";
import { describe } from "node:test";
import { jwtUser } from "../../../@types/Fastify-jwt";


export async function getMeController(req:FastifyRequest, res:FastifyReply){
    const jwt_decode = await req.jwtDecode() as jwtUser;
    const id = jwt_decode.sub
    const service = new getUserUseCase()

    try{
        const _get = await service.execute(id);

        res.status(200).send({
            description:"Successfully returned logged user!",
            body:_get
        })
    }catch(err){
        res.status(500).send({
            error:err
        })
    }
}