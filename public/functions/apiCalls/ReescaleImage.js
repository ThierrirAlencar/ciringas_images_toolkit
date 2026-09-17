
import {baseUrl, downloadImage} from "../forms"
import { getJwtToken } from "../../main";

//Reescale Image
document.getElementById('form1').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    const form = document.getElementById('form1');
    const formData = new FormData(form);

    try {
        const response = await fetch(baseUrl+'/image/process/rescale', {
            method: 'POST',
            body: formData,
            headers: token ? {
                'Authorization': `Bearer ${token}`,
            } : {}, //Se estiver logado usa o token, se não, envia vazio
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Imagem processada:', result);
            const ptUrl = result.ResultFromPython
            console.log("image is at: "+ptUrl)
            //await downloadImage(ptUrl)
        } else {
            console.error('Erro ao processar a imagem:', response.statusText);
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
    }
});