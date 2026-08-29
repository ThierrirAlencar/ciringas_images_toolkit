import { FastifyReply, FastifyRequest } from "fastify";
import { MulterRequest } from "../../../lib/multer";
import { IsUserLoggedIn } from "../../midleware/VerifyJWT";
import { createImageUseCase } from "../../../services/Images/CreateImage";
import { Image } from "@prisma/client";
import { ApplyEffectToFileUseCase } from "../../../services/Images/ApplyEffectToFile";
import z from "zod";
import { slugger } from "../../../utils/slugger";
import { FastifyJWT } from "@fastify/jwt";
import { jwtUser } from "../../../@types/Fastify-jwt";

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

        var newImage:Image|null = null;
        if(await IsUserLoggedIn(req) && req.file){
            const user = await req.jwtDecode() as jwtUser; 
            const ImageResgistyService = new createImageUseCase()
            newImage = await ImageResgistyService.execute({
            path:file.path,
                userId:String(req.cookies.sub),
                slug:slugger(`${file.originalname}.${file.mimetype}-${user.sub}`),
                mimetype:file.mimetype,
                size:file.size?String(file.size)+"kb":undefined
            })
        }

        console.log(`stdout ${stdout}`)
        res.status(201).send({
            ResultFromPython:stdout.replace("\r\n",""),
            Description:"uploaded and saved image",
            File:file,
            ToUser:newImage
        })
    }catch (error) {
        console.error(error);
    }
}