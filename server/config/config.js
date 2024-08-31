const { Sequelize } = require('sequelize');
require('dotenv').config();

const cwd = __dirname.split("/");
const rootDir = cwd.slice(0, cwd.length - 1).join("/");

const port = process.env.PORT;
const dialect = process.env.DIALECT;
const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.HOST;
const timezone = process.env.DB_TIMEZONE;
const jwtSecret = process.env.JWT_SECRET;
const assetsDir = process.env.ASSETS_DIR;

const editorsDir = assetsDir + "/editors";

const config = {
  port: port,
  jwtSecret: jwtSecret,
  assetsDir: assetsDir,
  editorsDir: editorsDir,
  rootDir: rootDir,
}

const sequelize = new Sequelize({

  dialect: dialect,
  host: host,
  username: username,
  password: password,
  database: database,
  timezone: timezone,

});

module.exports = { sequelize, config };


// dialect: 'mysql',
// host: '68.178.171.26',
// username: 'remote',
// password: '8FK1_AYV.$dq',
// database: 'dev_panel',
// timezone: "+05:30",
// jwtSecret: "sushilsss345"