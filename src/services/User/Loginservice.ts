import { prisma } from "../../core/prisma";
import { invalidPasswordError, userNotFoundError } from "../Errors/AuthErrors";


export class LoginUserUseCase{
    async execute(data:{Email:string,Password:string}):Promise<string>{
        const {Email,Password} = data
        const doesTheUserExists = await prisma.user.findUnique({
            where:{
                email:Email
            }
        })
        if(!doesTheUserExists){
            throw new userNotFoundError();
        }else if(doesTheUserExists.password == Password){
            return doesTheUserExists.id
        }else{
            throw new invalidPasswordError();
        }
    }
}