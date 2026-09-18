import "dotenv/config"
import { z } from "zod"

export const {API_HOST:HOST,API_PORT:PORT,API_PUBLIC_URL,MINIO_HOST,MINIO_PASSWORD,MINIO_PORT,MINIO_USER,MINIO_USE_SSL,NODE_ENV} = z.object({
    API_HOST:z.string(),
    API_PORT:z.string(),
    API_PUBLIC_URL:z.string().optional(),
    MINIO_HOST:z.string(),
    MINIO_PORT:z.string(),
    MINIO_USER:z.string(),
    MINIO_PASSWORD:z.string(),
    MINIO_USE_SSL:z.preprocess((value) => {
        if (typeof value === "string") {
            return value.trim().toLowerCase() === "true";
        }
        return value;
    }, z.boolean()).default(false),
    NODE_ENV:z.enum(["development","production","test"]).default("development"),
}).parse(process.env)
