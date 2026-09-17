import { ImageNotFoundError } from "../services/Errors/ImageErrors";
import { readFile } from "node:fs/promises";

/// Utility function to convert an image to a base64 string
export async function imageToBase64(path:string):Promise<string> {
	try {
		const image = await readFile(path);
		return image.toString("base64");
	} catch (error) {
		throw new ImageNotFoundError(`Unable to read image at path: ${path}`);
	}
}
