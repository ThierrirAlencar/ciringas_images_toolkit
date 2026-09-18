import { API_URL, PUBLIC_API_URL } from "./config/config"
import { app } from "./core/app"
import { HOST, PORT } from "./core/env"

app.listen({
    port:Number(PORT),
    host:HOST
},(err,path)=>{
    console.log(
        err?err:
        `serving api at:${PUBLIC_API_URL}\nserving documentation at:${PUBLIC_API_URL}/docs`)
})