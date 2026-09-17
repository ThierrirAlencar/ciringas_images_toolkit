import { api_url as baseUrl } from "../../control_handler.js";

export function getJwtToken() {
    return localStorage.getItem("ciringas_auth_token") || "";
}

export async function uploadImage(form, route) {
    const token = getJwtToken();
    const endpoint = token
        ? `${baseUrl}/image/process/${route}`
        : `${baseUrl}/image/process/${route}/authless`;

    const headers = token
        ? { Authorization: `Bearer ${token}` }
        : {};

    const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: new FormData(form)
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(result.description || result.error || `Image processing failed: ${response.status}`);
    }

    return result;
}

export async function getProcessedImageBase64(result) {
    const token = getJwtToken();
    const isAuthenticatedImage = Boolean(token && result?.ToUser?.id);
    const endpoint = isAuthenticatedImage
        ? `${baseUrl}/image/return/base64`
        : `${baseUrl}/image/return/base64/unlogged`;
    const body = isAuthenticatedImage
        ? { image_id: result.ToUser.id }
        : { image_url: result.ResultFromPython };
    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };

    const response = await fetch(endpoint, {
        method: "PATCH",
        headers,
        body: JSON.stringify(body)
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok || !payload?.data?.base64) {
        throw new Error(payload.description || payload.error || `Unable to retrieve processed image: ${response.status}`);
    }

    return payload.data.base64;
}

export async function displayProcessedImage(result) {
    const base64 = await getProcessedImageBase64(result);
    const preview = document.getElementById("processedImagePreview");
    const canvas = document.getElementById("processedImageCanvas");
    const status = document.getElementById("processedImageStatus");

    if (!canvas) {
        return;
    }

    const image = new Image();
    image.onload = () => {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        canvas.getContext("2d").drawImage(image, 0, 0);
        preview?.classList.remove("hidden");
        canvas.classList.remove("hidden");
        status?.classList.add("hidden");
    };
    image.src = `data:image/png;base64,${base64}`;
}