import "dotenv/config"
import { z } from "zod"

export const {API_HOST:HOST,API_PORT:PORT} = z.object({
    API_HOST:z.string(),
    API_PORT:z.string()
}).parse(process.env)
