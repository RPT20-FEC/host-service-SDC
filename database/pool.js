require('dotenv').config();
const pgHost = process.env.pgHost;
const pgUser = process.env.pgUser;
const db = process.env.db;
const dbPass = process.env.dbPass;
const dbPort = process.env.dbPort;

const path = require('path');
const Pool = require('pg').Pool
const pool = new Pool({
  user: pgUser,
  host: pgHost,
  database: db,
  password: dbPass,
  port: dbPort,
})

module.exports = pool;