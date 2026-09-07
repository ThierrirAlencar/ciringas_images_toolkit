import { FastifyInstance } from "fastify";
import { FaceRecogntionController } from "../Controller/uploads/FaceRecogntionController";
import { ImageTransaformControler } from "../Controller/uploads/ImageTransformationController";
import { ApplyEffectController } from "../Controller/uploads/ApplyEffectController";
import { RemoveFileBg } from "../Controller/uploads/RemoveBackgroundController";
import { upload } from "../../core/multer";



export async function ProcessingRouter(app:FastifyInstance) {
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
}