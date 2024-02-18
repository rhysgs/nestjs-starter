## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This service is structured to be a server rendered multi-page app of a more traditional structure. Uses [HTMX](https://htmx.org/docs/) with a custom JSX renderer as the templating engine.

### What runs the API beneath Nest?

By default Nest uses express, this uses the optional fastify back end which is faster.

### What templating system does this use?

Think of this as a much more traditional multi page app setup.

The JSX renderer which renders serverside to HTML can be found and modified at `src/lib/jtmx`, the types file in there can be updated to define any new JSX attributes you'd like to use.

Components using JSX will be rendered to HTML. Do not confuse the presence of JSX with React. There are no hooks, treat the JSX components as a traditional server rendered multi-page app that uses HTMX.

### How is authentication currently done?

Authentication is done via a session system with a database table to store the sessions.

### What database layer is used?

Database management is done via [Drizzle](https://orm.drizzle.team/) configured for Postgres.

A Docker compose file exists to assist with creating a local database.

## Headless

If you wish to use this as a headless API for a more traditional single page app front end like [React](https://react.dev/), check out the `headless` branch of this repository.

## Installation

```bash
$ npm install
```

## Running the app

Create a copy of `.env.sample` as `.env` with appropriate variables set.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Creating migratinos

To create migrations, update the entity schemas or create new ones in the database module `src/modules/database/database.structure.ts`.

Once done run the `db:sync` command to generate a migration.

```bash
$ npm run db:sync
```

New migrations will be run in the database when the Nest server boots.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Building

```bash
# entire app
$ npm run build

# just styles
$ npm run sass
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
