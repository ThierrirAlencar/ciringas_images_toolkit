import "dotenv/config"

const PORT = process.env.PORT
const HOST = process.env.HOST

export const api_url = "http://127.0.0.1:4545";


export * from "./functions/controlRange"
export * from "./functions/apiCalls/ApplyEffectToImage"
export * from "./functions/apiCalls/BgRemove"
export * from "./functions/apiCalls/ReescaleImage"
export * from "./functions/forms"
