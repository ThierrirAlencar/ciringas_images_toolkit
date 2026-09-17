
export class unableToUploadImageError extends Error {
    constructor(message?: string) {
        super(message || "Unable to upload image to MinIO");
        this.name = "unableToUploadImageError";
    }
}

export class unableToGetImageError extends Error {
    constructor(message?: string) {
        super(message || "Unable to get image from MinIO");
        this.name = "unableToGetImageError";
    }
}