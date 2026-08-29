import "@fastify/jwt"
import "fastify-multer"

export interface jwtUser{
    sub:string
}
declare module '@fastify/jwt' {
    export interface FastifyJWT {
        user:jwtUser
    }
}

