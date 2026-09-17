import { randomUUID } from "crypto";
import { ImageNotFoundError } from "../Errors/ImageErrors";
import { downloadImage } from "../../core/minio";
import { unableToGetImageError } from "../Errors/MinIOErrors";
import { imageToBase64 } from "../../utils/base64";
import { unlinkSync } from "fs";

export class getImageBase64WithLoginUseCase {
    async execute(image_url:string): Promise<string>{
        //Baixar a imagem do minIO para um respositório local temporário e depois converter para base64
        const image_path = `./temp/relative/${randomUUID()}-image.png`; // Caminho temporário para salvar a imagem
        //Tenta fazer o download da imagem através do MinIO, se não conseguir, lança um erro
        try {
            await downloadImage(image_url, image_path); // Função que baixa a imagem do MinIO para o caminho temporário
        } catch (error) {
            throw new unableToGetImageError("Error downloading image using MinIO!");
        }
        
        //Converte a imagem baixada para base64
        const material = await imageToBase64(image_path);

        //Limpar o arquivo temporário após a conversão para base64
        unlinkSync(image_path); // Descomente esta linha se quiser deletar o arquivo temporário após a conversão

        return material;
    }
}