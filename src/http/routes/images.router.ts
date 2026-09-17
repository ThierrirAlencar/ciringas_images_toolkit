import { FastifyInstance } from "fastify";
import { upload } from "../../core/multer";
import { GetImagesListWithoutLogin } from "../Controller/Images/getImagesWithoutLogin";
import { downloadImage } from "../Controller/Images/download";
import { ProcessingRouter } from "./processing.router";
import { getImageBase64WithLogin } from "../Controller/Images/getImageBase64WithLogin";
import { getImageWithoutLogin } from "../Controller/Images/getImageBase64WithoutLogin";
import { getImage } from "../Controller/Images/getImageById";
import { getImages } from "../Controller/Images/getImages";

export async function ImagesRoutes(app:FastifyInstance) {
    
    app.register(ProcessingRouter,{prefix:"/process"})

    //return image
    app.route({method:"GET",url:"/return",handler:GetImagesListWithoutLogin,schema:{
        tags:["images"],
        summary:"route used to return the image"
    }})

    //return image Base64 with Login
    app.route({method:"PATCH",url:"/return/base64",handler:getImageBase64WithLogin,schema:{
        tags:["images"],
        summary:"route used to return the image in base64 format with an authenticated user",
        body:{
            type:"object",
            properties:{
                image_id:{type:"number",description:"the id of the image to be retrieved"}
            },
            required:["image_id"],
        },
        security: [{ bearerAuth: [] }]
    }})

    //return image Base64 without Login
    app.route({method:"PATCH",url:"/return/base64/unlogged",handler:getImageWithoutLogin,schema:{
        tags:["images"],
        summary:"route used to return the image in base64 format without authentication",
        body:{
            type:"object",
            properties:{
                image_url:{type:"string",description:"the URL of the image to be retrieved"}
            },
            required:["image_url"],
        }
    }})

    //Get a single image entity by ID,
    app.route({method:"GET",url:"/getOne/{image_id}",handler:getImage,schema:{
        tags:["images"],
        summary:"route used to return the image in base64 format without authentication",
        params:{
            type:"object",
            properties:{
                image_id:{type:"number",description:"the id of the image to be retrieved"}
            },
            required:["image_id"],
        }
    }})

    //Get all the images from an user
    app.route({method:"GET",url:"/getAll",handler:getImages,schema:{
        tags:["images"],
        summary:"route used to return the image in base64 format without authentication",
        security: [{ bearerAuth: [] }]
    }})  

    //donwload routes
    app.route({method:"PATCH",url:"/download",handler:downloadImage,schema:{
        tags:["images"],
        summary:"route used to download the image",
        body:{
            type:"object",
            properties:{
                objectName:{type:"string",description:"the name of the image to be downloaded"}
            },
            required:["objectName"],
        }
    }})
    
}