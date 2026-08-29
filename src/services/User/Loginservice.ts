import { prisma } from "../../lib/prisma";


export class LoginUserUseCase{
    async execute(data:{Email:string,Password:string}):Promise<string>{
        const {Email,Password} = data
        const doesTheUserExists = await prisma.user.findUnique({
            where:{
                email:Email
            }
        })
        if(!doesTheUserExists){
            throw new Error("user does not exists");
        }else if(doesTheUserExists.password == Password){
            return doesTheUserExists.id
        }else{
            throw new Error("wrong password")
        }
    }
}