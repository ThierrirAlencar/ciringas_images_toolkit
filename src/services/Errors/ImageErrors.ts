
export class ImageNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ImageNotFoundError";
    }
}

export class ImageUnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ImageUnauthorizedError";
        this.cause = "You are not authorized to access this image.";
    }
}

export class ImageDoesNotExistsOnDatabase extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ImageDoesNotExistsOnDatabase";
        this.cause = "The image does not exist in the database.";
    }
}