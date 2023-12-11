# DDD Forum

## Dependencies

- Node
- Docker

## Install

`npm ci`

## Build

`npm run build`

## Test

`npm run test` runs all tests
`npm run test:e2e` runs end-to-end tests
`npm run test:infra` runs infrastructure tests
`npm run test:unit` runs unit tests

## Start

### Production

`npm run start`

### Development

`npm run start:dev`

#### Connect to local services

##### Docker

From local shell:

`docker exec -it dddforum-postgres-1 bash`

##### Postgres

From docker shell:

`psql -d dddforum -U postgres`
