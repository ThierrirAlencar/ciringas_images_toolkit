
import { displayProcessedImage, uploadImage } from "./uploadRequest.js";

document.getElementById('form3').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = document.getElementById('form3');

    try {
        const result = await uploadImage(form, 'remove');
        await displayProcessedImage(result);
        console.log('Imagem processada:', result);
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});