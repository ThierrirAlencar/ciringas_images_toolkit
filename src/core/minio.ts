import * as minio from "minio";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { MINIO_HOST, MINIO_PASSWORD, MINIO_PORT, MINIO_USE_SSL, MINIO_USER } from "./env";
import { unableToGetImageError, unableToUploadImageError } from "../services/Errors/MinIOErrors";

export const minioClient = new minio.Client({
    endPoint: MINIO_HOST,
    port: parseInt(MINIO_PORT, 10),
    useSSL: MINIO_USE_SSL,
    accessKey: MINIO_USER,
    secretKey: MINIO_PASSWORD,
});

export const minioStorageConfigPaths = {
    temporary:"./images/temporary/",
    final:"./images/final/",
    errors:"./errors/"
}

export const bucketName = "ciringas-images-toolkit";

export const minioReady = (async () => {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
        await minioClient.makeBucket(bucketName, "us-east-1");
    }
})();

export async function uploadImage(
    objectName: string,
    filePath: string,
    contentType = "application/octet-stream",
) {
    await minioReady;
    const fileStats = await stat(filePath);
    try{
        await minioClient.putObject(
            bucketName,
            objectName,
            createReadStream(filePath),
            fileStats.size,
            { "Content-Type": contentType },
        );
    }catch(err){
        console.error("Error checking file stats:", err);
        throw new unableToUploadImageError(`Unable to upload image with objectName: ${objectName}`);
    }

    return objectName;
}

export async function getImage(objectName: string) {
    await minioReady;
    const image = await minioClient.getObject(bucketName, objectName);
    if(!image){
        throw new unableToGetImageError(`Unable to get image with objectName: ${objectName}`);
    }
    return image;
}

export async function downloadImage(objectName: string, filePath: string) {
    await minioReady;
    await minioClient.fGetObject(bucketName, objectName, filePath);
}
