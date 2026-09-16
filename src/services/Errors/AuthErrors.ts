export class userAlreadyExistsError extends Error{
    constructor(){
        super("User already exists")
    }
}

export class userNotFoundError extends Error{
    constructor(){
        super("User not found")
    }
}

export class invalidPasswordError extends Error{
    constructor(){
        super("Invalid password")
    }
}