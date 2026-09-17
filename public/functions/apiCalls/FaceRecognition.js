import { displayProcessedImage, uploadImage } from "./uploadRequest.js";

document.getElementById("form4")?.addEventListener("submit", async function(event) {
    event.preventDefault();

    try {
        const result = await uploadImage(event.currentTarget, "faces");
        await displayProcessedImage(result);
        console.log("Imagem processada:", result);
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
});