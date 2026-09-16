import { FastifyReply, FastifyRequest } from "fastify";
import { MulterRequest } from "../../../core/multer";
import { IsUserLoggedIn } from "../../midleware/VerifyJWT";
import { createImageUseCase } from "../../../services/Images/CreateImage";
import { Image } from "@prisma/client";
import { ApplyEffectToFileUseCase } from "../../../services/Images/ApplyEffectToFile";
import z from "zod";
import { slugger } from "../../../utils/slugger";
import { FastifyJWT } from "@fastify/jwt";
import { jwtUser } from "../../../@types/Fastify-jwt";
import { basename } from "node:path";
import { unlink } from "node:fs/promises";
import { uploadImage } from "../../../core/minio";
import * as authErrors from "../../../services/Errors/AuthErrors"
import * as minIOErrors from "../../../services/Errors/MinIOErrors"

export async function ApplyEffectController(req:MulterRequest,res:FastifyReply){
    const file = req.file
    if (!file) {
        res.status(400).send({ error: "No file uploaded" })
        return
    }

    const {Effect,Amount}  = z.object({
          Effect:z.string(),
          Amount:z.string()
      }).parse(req.body)

    //initialize main service
    const Service = new ApplyEffectToFileUseCase()
   
    try{
        const {stdout} = await Service.execute({
            Amount:Number(Amount),Effect:Number(Effect),file
        })

        const outputPath = stdout.trim();
        const objectName = `images/final/${basename(outputPath)}`;
        
        await uploadImage(objectName, outputPath, "image/png");
        
        const ImageResgistyService = new createImageUseCase()
        
        var newImage:Image|null = null;
        
        
        if(await IsUserLoggedIn(req) && req.file){
            const user = await req.jwtDecode() as jwtUser; 

            newImage = await ImageResgistyService.execute({
            path:objectName,
                userId:String(req.cookies.sub),
                slug:slugger(`effect-${Effect}-${Amount}-${file.originalname}.${file.mimetype}-${user.sub}`),
                mimetype:file.mimetype,
                size:file.size?String(file.size)+"kb":undefined
            })
        }

        console.log(`stdout ${stdout}`)
        
        res.status(201).send({
            ResultFromPython:objectName,
            Description:"uploaded and saved image",
            File:{ ...file, path:objectName },
            ToUser:newImage
        })
        await unlink(file.path).catch(() => undefined);
    }catch (error) {
        if(error instanceof authErrors.userNotFoundError){
            res.status(404).send({
                description:error.message
            })
        }else if(error instanceof minIOErrors.unableToUploadImageError){
            res.status(500).send({
                description:"Unable to upload image to MinIO",
                error
            })
        }else{
            res.status(500).send({
                description:"Internal server error",
                error
            })
        }
    }
}