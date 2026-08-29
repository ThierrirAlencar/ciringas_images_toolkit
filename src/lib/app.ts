import fastify from "fastify";
import cors from "@fastify/cors"
import { router } from "../http/router";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import path from "path";
import { API_URL } from "../config/config";

export const app = fastify()

//register JWT
app.register(fastifyJwt,{
    secret:"ImagesToolkitLoginAndSingup"
});

//register CORS
app.register(cors, { 
    origin: true, // Permite todas as origens. Para restringir, você pode especificar uma URL, como 'http://localhost:3000'
    methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true // Permite o envio de cookies e headers de autorização entre o frontend e o backend
});

//Register fastify-static
app.register(fastifyStatic,{
    root: path.resolve(process.cwd(), "public")
})

//registra os cookies
app.register(fastifyCookie,{})


//ensina o fastify a ler arquivos 
app.register(fastifyMultipart)

//register Swagger/OpenAPI docs
app.register(swagger, {
    openapi: {
        openapi: "3.0.0",
        info: {
            title: "Images Toolkit API",
            version: "1.0.0",
            description: "API for image processing and user auth"
        },
        servers: [
            { url: API_URL, description: "Local development" }
        ],
        tags:[
            {name:"auth", description:"routes used for authentication"},
            {name:"effects", description:"routes used for image manipulation"},
            {name:"misc", description:"misc utility routes"},
        ]
    }
})

app.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
        docExpansion: "full",
        deepLinking: false
    },
    staticCSP: true,
    transformStaticCSP: (header) => header
})

//registra as rotas da aplição 
app.register(router);