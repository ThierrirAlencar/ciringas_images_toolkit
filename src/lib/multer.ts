import { FastifyRequest } from "fastify";
import multer from "fastify-multer";

export interface UploadedFile {
    path: string;
    originalname?: string;
    filename?: string;
    mimetype?: string;
    size?: number;
    [key: string]: any;
}

export const upload = multer({
    dest:".temp/uploads/"
})

export type MulterRequest = Omit<FastifyRequest, "file"> & {
    [x: string]: any;
    file?: UploadedFile;
};