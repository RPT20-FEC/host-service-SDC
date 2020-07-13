// const pgp = require('pg-promise')();
// const db = pgp(connection);
const path = require('path');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hostsdc',
  password: '111111',
  port: 5432,
})

module.exports = pool;