# TinyGu

## Requirements

1. node v14.18.0
2. Database (PostgreSQL 9.6.10)
3. yarn v1.22.10
4. tsc 4.3.5

## Setup

As always `yarn`.

For Develeopment usage you need to create a `.env` file in your root directory with the content:

```
DATABASE_URL = 'postgresql://user:password@localhost:5432/tinygu?schema=public'
SESSION_SECRET='destroytheworld'

NODE_ENV= #optional
PORT=3000 #optional
```

### For Development

Then you can start the development backendserver by navigating to the backend directory and running `yarn run start`.
Afterwards you can start the frontend by navigating to the frontend directory and running `yarn run start`

### For Production

```
NODE_ENV=(staging|production)
```

You want to run `yarn run deploy` with will create the CSS files from the SCSS files and starts the server.

There are no fancy functionalities implemented. If it crashes, it does not restart, you have to handle that yourself.

## Database

We use [Prisma](https://prisma.io) as our ORM. You can read the [concepts](https://www.prisma.io/docs/concepts) to get mor details on special parts of Prisma. But before you start, we recomend you to read about these concepts:

1. [Data Model](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model)
2. [Prisma Client Section 3 & 4](https://www.prisma.io/docs/concepts/components/prisma-client#3-use-prisma-client-to-send-queries-to-your-database)
3. [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)
