import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../core/prisma";
import { createUserUseCase } from "../../../services/User/CreateUser";
import * as authErrors from "../../../services/Errors/AuthErrors";

export async function PostUserController(req:FastifyRequest,res:FastifyReply) {
    const { email, password } = z.object({
        email: z.string().email(),
        password: z.string()
    }).parse(req.body)

    const service = new createUserUseCase()

    try{
        const Response = await service.execute({
            email,
            password
        })

        res.status(201).send({
            Description:"successfully created",
            Response
        })
    }catch(err){
        if(err instanceof authErrors.userAlreadyExistsError){
            res.status(409).send({
                Description:"User already exists"
            })
        }else{
            res.status(500).send({
                Description:"Internal server error",
                Error:err
            })
        }
    }
}