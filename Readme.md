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

Edit `/backend/config.json` to set allowed urls.

### For Development

Then you can start the development backendserver by navigating to the backend directory and running `yarn run start`.
Afterwards you can start the frontend by navigating to the frontend directory and running `yarn run start`

### For Production

Run `make install` which builds your app from scratch.

Then, create in the `build` directory a .env file (see Setup).

After that you just have to `make run`.

Note: There are no fancy functionalities implemented. If it crashes, it does not restart, you have to handle that yourself.

## Database

We use [Prisma](https://prisma.io) as our ORM. You can read the [concepts](https://www.prisma.io/docs/concepts) to get mor details on special parts of Prisma. But before you start, we recomend you to read about these concepts:

1. [Data Model](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model)
2. [Prisma Client Section 3 & 4](https://www.prisma.io/docs/concepts/components/prisma-client#3-use-prisma-client-to-send-queries-to-your-database)
3. [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)

## Create new admin accounts

Each admin user has

- username: should be a mail adress
- passwods (hash): a hashed password
- a salt for that hash

All these ingredients are stored in the database table `user`.
The hash and salt can be generated with the script `TinyGu/backend/server/crypto.ts`

You can run it by using `npx ts-node ./backend/server/crypto.ts`. The results are store in your table.

## REST API Documentation

### POST `/api/create`

Creates a keyword - url reference in the database.

#### body

|         | description                                                                | example                    |
| ------- | -------------------------------------------------------------------------- | -------------------------- |
| keyword | a keyword (String) representing the short link                             | "MathWiSe13"               |
| url     | a url (String) to direct to (allowed domains are specified in config.json) | "https://uni-frankfurt.de" |

#### return

```json
{
  "keyword": "MathWiSe13",
  "url": "https://www.uni-frankfurt.de/",
  "timestamp": "2021-07-26T11:32:26.429Z",
  "editstamp": "2021-07-26T11:32:26.429Z"
}
```

### GET `/api/redirect/:keyword`

Redirects to the url (with the keyword from url) stored in the database.

#### returns a 302 redirect

### POST `/api/login`

Logs in the user with the correct credentials.

#### body

|          | description | example         |
| -------- | ----------- | --------------- |
| username | String      | "test@test.com" |
| password | String      | "1234567 :)"    |

#### return

- 200: for correct login
- 401: for wrong credentials

It returns also a session cookie for authenticating further actions.

### DELETE `/api/login`

Deletes the current session which - in return - logs the user out.

#### return

- 200: In any circumstance.

### GET `/api/login`

Get the current status of the session.

#### return

- 200: If user is logged in.
- 401: If no user is logged in.

### GET `/api/admin`

Returns all Links, which contain the search string in the keyword or url.

#### query

|        | description | example  |
| ------ | ----------- | -------- |
| search | String      | "SoSe13" |

#### return

```json
[{
  "keyword": "MatheSoSe13",
  "url": "https://uni-frankfurt.de/",
  "timestamp": "2021-07-26T11:32:26.429Z",
  "editstamp": "2021-07-26T11:32:26.429Z"
}];
```

### DELETE `/api/admin`

Deletes a link with a keyword.

#### body

|         | description | example  |
| ------- | ----------- | -------- |
| keyword | String      | "SoSe13" |

#### return

- 200: for successful deletion
- 404: in any other case

### PATCH `/api/admin/:keyword`

Patches (edit) a link with a keyword, specified in the url.

**Attention:** you need to specify both keyword and url in the parameter, event if you are changing only one thing.

#### body

|         | description | example                    |
| ------- | ----------- | -------------------------- |
| keyword | String      | "SoSe13"                   |
| url     | String      | "https://uni-frankfurt.de" |

#### return

- 400: If the old keyword, new url and new keyword are not Strings
- 400:

```json
{ "error": "the url is not valid" }
```

- 400:

```json
{ "error": "the keyword is not valid" }
```

- 200: the modified entry

- 404:

```json
{ "error": "keyword not found" }
```

- 500:
  in any other case
