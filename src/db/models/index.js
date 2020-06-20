'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/config.json');
import env from "dotenv"
env.config()
const db = {};

let sequelize;

console.log(process.env)

if (process.env.NODE_ENV === "production") {
  console.log("production db connected", process.env.NODE_ENV)
  sequelize = new Sequelize(config.production.database, config.production.username, config.production.password, {
    ...config.production
  });
}
else if (process.env.NODE_ENV === "test") {
  console.log("test db connected", process.env.NODE_ENV)
  sequelize = new Sequelize(config.test.database, config.test.username, config.test.password, {
    ...config.test
  });
}
else {
  console.log("developement db", process.env.NODE_ENV)
  sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    ...config.development
  });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
