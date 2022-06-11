const { Pool, Client } = require('pg')
require('dotenv').config();

const {DB_HOST, DB_USER, DB_PW, DB_DB } = process.env;

const credentials = {
  host: DB_HOST,
  port: 5432,
  database: DB_DB,
  user: DB_USER,
  password: DB_PW
};

const connection = new Pool(credentials);

module.exports = connection;