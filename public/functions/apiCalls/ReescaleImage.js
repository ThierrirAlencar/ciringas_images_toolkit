
import { displayProcessedImage, uploadImage } from "./uploadRequest.js";

//Reescale Image
document.getElementById('form1').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    const form = document.getElementById('form1');
    try {
        const result = await uploadImage(form, 'rescale');
        await displayProcessedImage(result);
        console.log('Imagem processada:', result);
    } catch (error) {
        console.error('Erro de conexão:', error);
    }
});