import { FastifyInstance } from "fastify";
import { ApplyEffectController } from "../Controller/uploads/ApplyEffectController";
import { RemoveFileBg } from "../Controller/uploads/RemoveBackgroundController";
import { ImageTransaformControler } from "../Controller/uploads/ImageTransformationController";
import { upload } from "../../core/multer";
import { GetImagesListWithoutLogin } from "../Controller/Images/getImagesWithoutLogin";
import { downloadImage } from "../Controller/Images/download";
import { FaceRecogntionController } from "../Controller/uploads/FaceRecogntionController";
import { ProcessingRouter } from "./processing.router";

export async function ImagesRoutes(app:FastifyInstance) {
    
    app.register(ProcessingRouter,{prefix:"/process"})

    //return image
    app.route({method:"GET",url:"/return",handler:GetImagesListWithoutLogin,schema:{
        tags:["images"],
        summary:"route used to return the image"
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