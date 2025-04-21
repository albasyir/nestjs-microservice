# NestJS Microservice

implement fan-out pattern

>[!NOTE]
>This implementation is running well on MacOS (because the only device that i have) however it should be ran on other device (Windows or Linux) since i use basic docker image

>[!WARNING]
>For production, i'm sure this will work, however development in Windows might challenging for now (unless i adjust for no mounting strategy)

## How to Test

- run project (dev or production)
  - read below (more) to know how to run any env (including your remote AC 😆)
  - for dev it will automatically run all apps
  - for production, one app, one container
- access http://localhost:3000 or http://localhost:3000/docs
  - after access that i think you will know
  - there's to module `Order` and `Menu` all documented well there

## Run Project

this section will talk about how run project on Development and Production, and assuming that

- have docker on env that need to run or build it
- (if needed) you willing freely some ports

### Development

- make sure port 3000, 3001, 3002, 5100, 15672 are free
- run `docker compose up`

#### Port Information

- 3000 is port for Order App
- 5100 is port for database management
- 15672 is port for rabbitMQ management

#### Credential Ops

- MySQL
  - username: root
  - password: mypassword
- RabbitMQ
  - username: rabbitmq
  - password: mypassword

#### Information

- `./tmp/*` represent data related with service(s)
- your development data are safe on `./tmp` folder so expect will be presist even you delete docker volume
- `./tmp` folder data can be copy to other device however it can't guaranty corruption, (maybe) as long as you copy /backup when docker state stop and (always) was gracefully stopping
  
### Production

how we deploy for one server or different server, here's strategy

- build once to speedup CI/CD and reduce resource usage
- same image contain all apps
- to run which app should be run, we only need passing env `APP_TYPE` variable
  - example to run order app, we have to pass `APP_TYPE=order`

#### Simulate Production

the idea is, we run example infrastructure that can reproduce "production like" and we run each app for each container so one app (example order) is run on it own container so we can make sure that scale

- build docker image with `docker build . --target production --tag nestjs-microservice-apps`, tag name can be changed
- simulate infrastructure by 
  - make sure ports 15672, 5672, 3306, 5100 are free
  - execute `docker compose -f ./docker/production/compose-example.yml up`
- run with `docker run -p 3000:3000 --env-file ./docker/production/.env.example -e APP_TYPE=order nestjs-microservice-apps` 
  - env can be change as you wish
  - for port you can skip when deploy app that doesn't need http exposure like `docker run --env-file ./docker/production/.env.example -e APP_TYPE=kitchen nestjs-microservice-apps`
