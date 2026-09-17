import { randomUUID } from "crypto";
import { ImageNotFoundError } from "../Errors/ImageErrors";
import { downloadImage } from "../../core/minio";
import { unableToGetImageError } from "../Errors/MinIOErrors";
import { imageToBase64 } from "../../utils/base64";
import { mkdir, unlink } from "node:fs/promises";
import path from "node:path";

export class getImageBase64WithLoginUseCase {
    async execute(image_url:string): Promise<string>{
        //Baixar a imagem do minIO para um respositório local temporário e depois converter para base64
        const objectName = image_url.trim().replace(/^['"]|['"]$/g, "");
        const temporaryDirectory = path.resolve(process.cwd(), ".temp", "relative");
        const image_path = path.join(temporaryDirectory, `${randomUUID()}-image.png`);
        await mkdir(temporaryDirectory, { recursive: true });
        //Tenta fazer o download da imagem através do MinIO, se não conseguir, lança um erro
        try {
            await downloadImage(objectName, image_path); // Função que baixa a imagem do MinIO para o caminho temporário
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new unableToGetImageError(`Unable to get image with objectName ${objectName}: ${message}`);
        }
        
        //Converte a imagem baixada para base64
        const material = await imageToBase64(image_path);

        //Limpar o arquivo temporário após a conversão para base64
        await unlink(image_path);

        return material;
    }
}