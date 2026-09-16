import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { updateUserUseCase } from "../../../services/User/updateUser";
import * as authErrors from "../../../services/Errors/AuthErrors";

export async function updateUserController(req: FastifyRequest, res: FastifyReply) {
    const { email, password, username } = z.object({
        username: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().optional()
    }).parse(req.body ?? {});

    const { id } = z.object({
        id: z.string()
    }).parse(req.params ?? {});

    const service = new updateUserUseCase();

    try {
        const _update = await service.execute(id, {
            email,
            password,
            username
        });

        res.status(201).send({
            description: "successfully updated the user!",
            body: _update
        });
    } catch (err) {
        if(err instanceof authErrors.userNotFoundError){
            res.status(404).send({
                description: "User not found",
                body: null
            });
        }else{
            res.status(500).send({
                description: "Internal server error",
                body: null
            });
        }
    }
}