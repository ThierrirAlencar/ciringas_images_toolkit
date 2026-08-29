import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { GoHome } from "../Controller/GoHomeController";
import { HOST, PORT } from "../../lib/env";
import { API_URL } from "../../config/config";

export async function UtilsRoutes(app:FastifyInstance) {
    
        //frontend call 
        app.route({method:"GET",url:"/home",handler:GoHome,schema:{
            tags:["misc"],
            summary:"frontend access route"
        }})
        app.route({method:"GET",url:"/",handler:async(req:FastifyRequest,res:FastifyReply)=>{
            res.header('Content-Type', 'text/html');
            res.redirect(`${API_URL}/home`)
            res.send(`<p>Hey, we are moving to an active FrontEnd. While this new App is not done we can use <a href="${API_URL}/home">this</a></p>`)
        },schema:{
            tags:["misc"],
            summary:"base api route, redirects to ${API_URL}/home"
        }});
    
    
}