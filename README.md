# NestJS Microservice

will be explained leter

## Run Project

### Development

- install Docker
- setup env for each apps
- make sure port 3000, 3001, 3002, 5100, 15672 are free
- run `docker compose up`

#### Port Information

- 3000 is port for order
- 3001 is port for kitchen
- 3002 is port for notification
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

- your development data are safe on `./tmp` folder so expect will be presist even you delete docker volume
- `./tmp` folder data can be copy to other device however it can guaranty us data isn't corrupt

### Production

will be explained leter
