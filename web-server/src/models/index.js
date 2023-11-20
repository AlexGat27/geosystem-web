const {Sequelize} = require('sequelize');
const {UserDB, PotholeDB} = require('../config/dbEnv');

const userSequelize = new Sequelize(UserDB.database, UserDB.username, UserDB.password, {
  host: UserDB.host,
  dialect: UserDB.dialect
});

const potholeSequelize = new Sequelize(PotholeDB.database, PotholeDB.username, PotholeDB.password, {
  host: PotholeDB.host,
  dialect: PotholeDB.dialect
});

module.exports = {userSequelize, potholeSequelize}
