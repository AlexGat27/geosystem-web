const {Sequelize} = require('sequelize');
const {PotholeDB} = require('../config/dbEnv');

const sequelize = new Sequelize(PotholeDB.database, PotholeDB.username, PotholeDB.password, {
  host: PotholeDB.host,
  dialect: PotholeDB.dialect
});

module.exports = {sequelize}
