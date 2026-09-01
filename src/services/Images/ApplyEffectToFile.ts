import { execFile } from "child_process";
import path from "path";
import { promisify } from "util";
import { OutOfRangeError } from "../Errors/OutOfRangeError";

interface ApplyEffecResponse{
    stdout:string
}

interface ApplyEffectRequest{
    file: {
        path: string;
        [key: string]: any;
    }
    Effect:Number
    Amount:Number
}
export class ApplyEffectToFileUseCase{
    constructor(){}
    async execute({Amount,Effect,file}:ApplyEffectRequest):Promise<ApplyEffecResponse>{
        
        //Checks if the amount is loaded
        switch(Number(Effect)){
            case 2: if(Number(Amount)>7){
                throw new OutOfRangeError()
                }break;
            case 3: if(Number(Amount)>15){
                throw new OutOfRangeError()
                }break;
            case 4:
                if(Number(Amount)<10){
                    throw new OutOfRangeError()
                }break;
        }

        const execFilePromise = promisify(execFile);
        const pythonScriptPath = path.resolve(process.cwd(), 'src', 'python', 'Effects.py');
        const ImagePath = path.resolve(file.path);
        const exitPath = path.resolve(process.cwd(), '.temp', 'images');

        const { stdout, stderr } = await execFilePromise('python', [
            pythonScriptPath,
            ImagePath,
            exitPath,
            String(Effect),
            String(Amount)
        ]);
        
        if (stderr) {
            throw new Error(stderr)
        }

        return {
            stdout
        }
    }
}