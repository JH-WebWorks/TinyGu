# TinyGu

## Requirements

1. node v10
2. Database (MariaDB)
3. npm v6

## Setup

As always `npm install`.

For Develeopment usage you need to create a `.env` file in your root directory with the content:

```
DB_DATA=your_db_database
DB_USER=your_db_user
DB_PASS=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port

ENVIROMENT=
PORT=(3000 by default)
```

### For Development

It is nessersary to set the Varriabel `ENVIROMENT=development`, otherwise it will not (re)create the database and fill it with testdata.

Then you can start the deveopment server with `npm run start`

### For Production

You want to run `npm run deploy` with will create the CSS files from the SCSS files and starts the server.

There are no fancy functionalities implemented. If it crashes, it does not restart, you have to handle that yourself.

## Database

This Project needs a MariaDB database and uses sequellize [docs](https://sequelize.org/master/) to connect to the database. Sequellize is an ORM and allows you to use another Databse if you want. To do this

1. you need to change the `dialect` varriable int `db/connection.js`.
2. remove the mariadb connector `npm uninstall mariadb`
3. install the connector you want (see installation section [here](https://sequelize.org/master/manual/getting-started.html#installing))
