import { ImageNotFoundError } from "../services/Errors/ImageErrors";

/// Utility function to convert an image to a base64 string
export async function imageToBase64(path:string):Promise<string> {
    const material = await imageToBase64(path)
        .then(
            (response) => {
                console.log(response); 
                return response;
            }
        )
        .catch(
            (error) => {
                console.log(error); 
            }
    )

    if(!material) {
        throw new ImageNotFoundError("Image not found at the specified path.");
    }

    return material;
}
