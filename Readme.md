# TinyGu

## Requirements

1. node v14.16.0
2. Database (MariaDB)
3. yarn v1.22.5

## Setup

### get the submodules
```sh
git submodule init
git submodule update
```

As always `yarn`.

For Develeopment usage you need to create a `.env` file in your root directory with the content:

```
DATABASE_URL = 'mysql://root:root@localhost:3306/tinygu'

ENVIROMENT= #optionaly
PORT=(3000 by default) #optional
```

### For Development

It is nessersary to set the Varriabel `ENVIROMENT=development`, otherwise it will not (re)create the database and fill it with testdata.

Then you can start the deveopment server with `yarn run start`

### For Production

You want to run `yarn run deploy` with will create the CSS files from the SCSS files and starts the server.

There are no fancy functionalities implemented. If it crashes, it does not restart, you have to handle that yourself.

## Database
We use [Prisma](https://prisma.io) as our ORM. You can read the [concepts](https://www.prisma.io/docs/concepts) to get mor details on special parts of Prisma. But before you start, we recomend you to read about these concepts:
1. [Data Model](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model)
2. [Prisma Client Section 3 & 4](https://www.prisma.io/docs/concepts/components/prisma-client#3-use-prisma-client-to-send-queries-to-your-database)
3. [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)

