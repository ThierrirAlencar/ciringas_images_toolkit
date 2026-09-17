import { FastifyInstance } from "fastify";

import { upload } from "../../core/multer";
import { RemoveFileBackgroundWithoutLoginController } from "../Controller/uploads/authLess/RemoveBackgroundController";
import { ApplyEffectWithoutLoginController } from "../Controller/uploads/authLess/ApplyEffectController";
import { ImageTransformationWithoutLoginController } from "../Controller/uploads/authLess/ImageTransformationController";
import { FaceRecogntionWithoutLoginController } from "../Controller/uploads/authLess/FaceRecogntionController";
import { RemoveFileBg } from "../Controller/uploads/Default/RemoveBackgroundController";
import { ApplyEffectController } from "../Controller/uploads/Default/ApplyEffectController";
import { ImageTransaformControler } from "../Controller/uploads/Default/ImageTransformationController";
import { FaceRecogntionController } from "../Controller/uploads/Default/FaceRecogntionController";

export async function ProcessingRouter(app:FastifyInstance) {

    //upload and apply effects (With login)
    app.route({method:"POST",url:"/remove",handler:RemoveFileBg,preHandler:upload.single("avatar"),schema:{
            tags:["effects"],
            summary:"route used to remove background from image",
            security: [{ bearerAuth: [] }]
    }})
    app.route({url:"/effect",method:"POST",handler:ApplyEffectController,preHandler:upload.single("avatar"),schema:{
            tags:["effects"],
            summary:"route used to apply effect to image",
            security: [{ bearerAuth: [] }]
    }})
    app.route({url:"/rescale",method:"POST",handler:ImageTransaformControler,preHandler:upload.single("avatar"),schema:{
            tags:["effects"],
            summary:"route used to reescale image",
            security: [{ bearerAuth: [] }]
    }})
    app.route({method:"POST",url:"/faces",handler:FaceRecogntionController,schema:{
            tags:["effects"],
            summary:"route used for facial recognition algorithim",
            security: [{ bearerAuth: [] }]
    }})
    
    
    //upload and apply effects (Without login)
    app.route({method:"POST",url:"/remove/authless",handler:RemoveFileBackgroundWithoutLoginController,preHandler:upload.single("avatar"),schema:{
            tags:["effects"],
            summary:"route used to remove background from image, without authentication"
    }})
    app.route({url:"/effect/authless",method:"POST",handler:ApplyEffectWithoutLoginController,preHandler:upload.single("avatar"),schema:{
            tags:["effects"],
            summary:"route used to apply effect to image, without authentication"
    }})
    app.route({url:"/rescale/authless",method:"POST",handler:ImageTransformationWithoutLoginController,preHandler:upload.single("avatar"),schema:{
            tags:["effects"],
            summary:"route used to reescale image, without authentication"
    }})
    app.route({method:"POST",url:"/faces/authless",handler:FaceRecogntionWithoutLoginController,schema:{
            tags:["effects"],
            summary:"route used for facial recognition algorithim, without authentication"
    }})
}