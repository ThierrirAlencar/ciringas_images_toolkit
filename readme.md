




<p align="center">
    <img src="./public/images/ico01.png" width="200px" height="200px">
    <br>
    <br>
    Um pacote de ferramentas de fácil acesso para manipulação de imagem através de algorítimos simples. A aplicação combina frameworks do ambiente javascript com sistemas desenvolvidos em python com objetivo de utilizar o melhor dos dois mundos. <br>
</p>

<p align="center">
    <img src="https://img.shields.io/badge/typescript-5.6.2-blue" alt="TypeScript 5.6.2">
    <img src="https://img.shields.io/badge/Fastify-5.0.0-green" alt="Fastify 5.0.0">
    <img src="https://img.shields.io/badge/Prisma-5.22.0-red" alt="Prisma 5.22.0">
    <img src="https://img.shields.io/badge/zod-3.23.8-orange" alt="Zod 3.23.8">
</p>

## Working features 🎁

- Background remove
- image modifications like grayscale, blur, pixelization ,edges and color modes. 
- Image reescale
- Human Face Recognition and easy modifications applied 

## Running the package 🚀

### Using Docker

Setup enviroment
```bash
$ cp .env.example .env
```
Setup docker container
```bash
$ docker compose up -p <container_name> -d 
```

(Optional) the Project contains a fixed image for older CPUs without specific requirements to run.
```bash
$ cp .env.example docker/.env
$ docker compose -p <image_name> docker/docker-compose[LOWCPU].yaml up -d
```

### Running locally in Deploy mode
Requires a Docker container with postgresql, redis and minIO

Setup enviroment
```bash
$ cp .env.example .env
```

Setup python enviroment
```bash
$ python -m venv .venv
```

Enter Enviroment (may change dependeding on OS)
```bash
$ source .venv/bin/activate
```

Intall python dependencies
```bash
$ pip install -r requirements.txt
```

Install nodeJS dependencies
```bash
$ npm install --save
```
Run project (in production)
```bash
$ npm run deploy
```

### Running locally in Dev mode
Requires a Docker container with postgresql, redis and minIO

Setup enviroment
```bash
$ cp .env.example .env
```

Setup python enviroment
```bash
$ python -m venv .venv
```

Enter Enviroment (may change dependeding on OS)
```bash
$ source .venv/bin/activate
```

Intall python dependencies
```bash
$ pip install -r requirements.txt
```

Install nodeJS dependencies
```bash
$ npm install --save
```

Initialize prisma ORM
```bash
$ npx prisma generate 
$ npx prisma db push
```

Run project (as developer)
```bash
$ npm run dev
```

### Automatic deployment

The GitHub Actions workflow checks pull requests targeting `main` and deploys after one is merged. The deployment server must already have Docker, Docker Compose, a clone of this repository, and its own `.env` file in the deployment directory.

Create a `production` environment in the repository and add these secrets:

- `SERVER_HOST`: server hostname or IP address
- `SERVER_PORT`: SSH port, usually `22`
- `SERVER_USER`: SSH user
- `SERVER_PATH`: absolute path of the repository on the server
- `SERVER_SSH_PRIVATE_KEY`: private key allowed to log in to the server
- `SERVER_KNOWN_HOSTS`: output of `ssh-keyscan -p <port> <host>`

The SSH user must be able to run Docker, and the repository checkout on the
server must have `origin` configured to the GitHub repository.

## What i've learned? 🤓

- multer and multipart form data request for APIs.
- Use of python functions inside JS development. 
- Knowledge of python librarys like OpenCV and RemBg.
- Redis optmized Caching
- MinIO optmized S3 storage 


# Why Docker?
Docker is a fullscale containerization plataform who let's you build apps that will run anywhere (or at least they should). By building a docker app i secure that all the dependencies that my project have will go with him everywhere that my app goes.