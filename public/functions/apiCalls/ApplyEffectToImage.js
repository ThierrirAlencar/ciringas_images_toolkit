
import { displayProcessedImage, uploadImage } from "./uploadRequest.js";

//apply effect to image
document.getElementById('form2').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    
    const form = document.getElementById('form2');
    try {
        const result = await uploadImage(form, 'effect');
        await displayProcessedImage(result);
        console.log('Imagem processada:', result);
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});
    
    