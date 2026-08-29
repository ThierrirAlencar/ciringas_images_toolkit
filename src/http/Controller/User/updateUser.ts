import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { updateUserUseCase } from "../../../services/User/updateUser";

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
        res.status(500).send({
            error: err instanceof Error ? err.message : err
        });
    }
}