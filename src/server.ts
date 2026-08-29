import { API_URL } from "./config/config"
import { app } from "./lib/app"
import { HOST, PORT } from "./lib/env"

app.listen({
    port:Number(PORT),
    host:HOST
},(err,path)=>{
    console.log(
        err?err:
        `serving api at:${API_URL}\nserving documentation at:${API_URL}/docs`)
})