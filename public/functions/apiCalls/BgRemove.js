
import {baseUrl, downloadImage} from "../forms"

document.getElementById('form3').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const form = document.getElementById('form3');
    const formData = new FormData(form); // Cria um FormData com os dados do formulário

    try {
        const response = await fetch(baseUrl+'/image/remove', {
            method: 'POST',
            body: formData, // Envia os dados do formulário
        });
        
        if (response.ok) {
            const result = await response.json(); // Processa a resposta como JSON
            console.log('Imagem processada:', result);
            const ptUrl = result.ResultFromPython.replace(" ","");
            console.log("image is at: "+ptUrl)
            await downloadImage(ptUrl);
        } else {
            console.error('Erro ao processar a imagem:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});