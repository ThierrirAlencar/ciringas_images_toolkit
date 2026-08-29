import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
export async function PostUserController(req:FastifyRequest,res:FastifyReply) {
    const { email, password } = z.object({
        email: z.string().email(),
        password: z.string()
    }).parse(req.body)

    try{
        const Response = await prisma.user.create({
            data:{
                email,
                password
            }
        })
        res.status(201).send({
            Description:"successfully created",
            Response
        })
    }catch(err){
        console.error(err)
    }
}