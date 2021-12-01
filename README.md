# Scrum Project Tracker API

This API is built upon the [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. It applies a very basic set of modern MVC programming concepts, namely:

- Separation of concerns (through modules)
- Dependency injection (through built in NestJS decorators)
- Declarative modelling through objects, called entities in our code
- Simple CRUD ops through a dedicated service layer

You can find more information about the NestJS framework using the above link, or the website ([nestjs.com](https://nestjs.com/))

## Structure

The codebase is separated into a set of (sometimes interconnected) modules:

- Category module: CRUD operations related to operating on TODO categories created via the UI
- Task module: CRUD operations related to operating on individual TODO tasks
- Common module: Shared classes, which implement non feature-specific functionality

Each module consists of:

- A `<name>.module.ts` class, defining the module's controllers, dependencies, and imports/exports (used by NestJS for building the dependency graph used in injection)
- One `<name>.controller.ts` class, defining the routes handled by the module
- One `<name>.service.ts` class, implementing the basic CRUD ops
- A `dto/` folder, containing the objects used by the controllers (as inputs, or outputs)
- An `entity/` folder, containg the database model with required constraints and keys defined

## Storage

The API uses a local SQLite database file (for ease of sharing), and TypeORM as the ORM layer. Once you run the server, a file named `testData` will be created under the `db/` folder, which contains your data

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

- Once you run the app, you'll have access to a Swagger interface at: [`http://localhost:3000/api`](http://localhost:3000/api)
- You can use this for viewing the object interfaces, and testing your changes.

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
