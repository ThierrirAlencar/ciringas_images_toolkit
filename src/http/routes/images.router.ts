import { FastifyInstance } from "fastify";
import { ApplyEffectController } from "../Controller/uploads/ApplyEffectController";
import { RemoveFileBg } from "../Controller/uploads/RemoveBackgroundController";
import { ImageTransaformControler } from "../Controller/uploads/ImageTransformationController";
import { upload } from "../../lib/multer";
import { GetImagesListWithoutLogin } from "../Controller/Images/getImagesWithoutLogin";
import { downloadImage } from "../Controller/Images/download";
import { FaceRecogntionController } from "../Controller/uploads/FaceRecogntionController";

export async function ImagesRoutes(app:FastifyInstance) {
    
    //upload and apply effects
    app.route({method:"POST",url:"/remove",handler:RemoveFileBg,preHandler:upload.single("avatar"),schema:{
        tags:["effects"],
        summary:"route used to remove background from image"
    }})
    app.route({url:"/effect",method:"POST",handler:ApplyEffectController,preHandler:upload.single("avatar"),schema:{
        tags:["effects"],
        summary:"i dont't actually know what it does"
    }})
    app.route({url:"/rescale",method:"POST",handler:ImageTransaformControler,preHandler:upload.single("avatar"),schema:{
        tags:["effects"],
        summary:"route used to reescale image"
    }})
    app.route({method:"POST",url:"/faces",handler:FaceRecogntionController,schema:{
        tags:["effects"],
        summary:"route used for facial recognition algorithim"
     }})


    //return image
    app.route({method:"GET",url:"/return",handler:GetImagesListWithoutLogin,schema:{
        tags:["effects"],
        summary:"route used to return the image"
    }})

    //donwload routes
    app.route({method:"PATCH",url:"/download",handler:downloadImage,schema:{
        tags:["effects"],
        summary:"route used to download the image"
    }})
    
}