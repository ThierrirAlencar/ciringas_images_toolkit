import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { date, z } from "zod";
import { LoginUserUseCase } from "../../../services/User/Loginservice";
import * as authErrors from "../../../services/Errors/AuthErrors"


export async function LoginController(req:FastifyRequest, res:FastifyReply) {
    const { email, password } = z.object({
        email: z.string().email(),
        password: z.string()
    }).parse(req.body)

    try{
        const response = await new LoginUserUseCase().execute({
            Email: email,
            Password: password
        })
        const Token = await res.jwtSign({},{
            sign:{
                sub:response
            }
        })
        if(response){
            const cookie = res.cookie("slug",Token,{
                expires:new Date(Date.now()+60*60*24),
            });
            res.status(200).send({
                description:"logged-in",
                Token:Token
            })
        }
    }catch(err){
        if(err instanceof authErrors.userNotFoundError){
            res.status(404).send({
                Description:"User not found"
            })
        }else if(err instanceof authErrors.invalidPasswordError){
            res.status(401).send({
                Description:"Invalid password"
            })
        }else{
            res.status(500).send({
                Description:"Internal server error",
                Error:err
            })
        }
    }
}