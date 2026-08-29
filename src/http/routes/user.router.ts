import { FastifyInstance } from "fastify";
import { LoginController } from "../Controller/User/Login";
import { PostUserController } from "../Controller/User/RegisterUser";
import { updateUserController } from "../Controller/User/updateUser";
import { getUniqueUserController } from "../Controller/User/getUser";
import { getManyUserController } from "../Controller/User/getManyUsers";

export async function UserRouter(app:FastifyInstance) {
    //user and commonjs routes
    app.route({
        method: "POST",
        url: "/login",
        handler: LoginController,
        schema: {
            tags: ["auth"],
            summary: "route used for login",
            body: {
                type: "object",
                properties: {
                    username: { type: "string" },
                    email: { type: "string", format: "email" },
                    password: { type: "string" }
                },
                required: ["email", "password"],
                additionalProperties: false
            }
        }
    });

    app.route({
        method: "POST",
        url: "/register",
        handler: PostUserController,
        schema: {
            tags: ["auth"],
            summary: "route used to register a new user on our system.",
            body: {
                type: "object",
                properties: {
                    email: { type: "string", format: "email" },
                    password: { type: "string" }
                },
                required: ["email", "password"],
                additionalProperties: false
            }
        }
    });

    app.route({
        method: "PATCH",
        url: "/update/:id",
        handler: updateUserController,
        schema: {
            tags: ["auth"],
            summary: "route used to update an already existing user",
            params: {
                type: "object",
                properties: {
                    id: { type: "string" }
                },
                required: ["id"],
                additionalProperties: false
            },
            body: {
                type: "object",
                properties: {
                    email: { type: "string", format: "email" },
                    password: { type: "string" },
                    username: { type: "string" }
                },
                additionalProperties: false
            }
        }
    });

    app.route({
        method:"GET", 
        url:"/unique/:id",
        handler:getUniqueUserController,
        schema:{
            params:{
                type:"object",
                properties:{
                    id:{type:"string"}
                },
                required:["id"]
            },
            tags:["auth"],
            summary: "route used to get an existing user",
        }
    })

    app.route({
        method:"GET", 
        url:"/all/",
        handler:getManyUserController,
        schema:{
            tags:["auth"],
            summary: "route used to get all api existing users",
        }
    })
}