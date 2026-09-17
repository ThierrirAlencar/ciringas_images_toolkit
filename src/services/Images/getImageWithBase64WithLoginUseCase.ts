import { randomUUID } from "crypto";
import { prisma } from "../../core/prisma";
import { imageToBase64 } from "../../utils/base64";
import { ImageNotFoundError, ImageUnauthorizedError } from "../Errors/ImageErrors";
import { downloadImage, getImage } from "../../core/minio";
import { unableToGetImageError } from "../Errors/MinIOErrors";
import {unlinkSync} from "fs";

export class getImageBase64WithLoginUseCase {
    async execute(image_id:number, user_id:string): Promise<string>{
        const image = await prisma.image.findUnique({
            where:{
                id:image_id,
            }
        })

        if(!image){
            throw new ImageNotFoundError("Image not found!")
        }

        if(image.userId !== user_id){
            throw new ImageUnauthorizedError("Image not found!")
        }
        
        //Baixar a imagem do minIO para um respositório local temporário e depois converter para base64
        const imagePath = `./temp/relative/${randomUUID()}-${image.id}-${image.userId}.${image.mimetype}`; // Caminho temporário para salvar a imagem
        //Tenta fazer o download da imagem através do MinIO, se não conseguir, lança um erro
        try {
            await downloadImage(image.path, imagePath); // Função que baixa a imagem do MinIO para o caminho temporário
        } catch (error) {
            throw new unableToGetImageError("Error downloading image using MinIO!");
        }

        //Converte a imagem baixada para base64
        const material = await imageToBase64(imagePath);

        //Limpar o arquivo temporário após a conversão para base64
        unlinkSync(imagePath); // Descomente esta linha se quiser deletar o arquivo temporário após a conversão

        return material;
    }
}