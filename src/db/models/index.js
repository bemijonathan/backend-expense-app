'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json');
// const config = configurationfile[env]

const db = {};

let sequelize;
if (process.env.NODE_ENV === "production") {
  console.log("production db connected")
  sequelize = new Sequelize(config.production.database);
} else if (process.env.NODE_ENV === "test") {
  console.log("test db connected")
  sequelize = new Sequelize(config.test.database, config.test.username, config.test.password, {
    ...config.test
  });
} else {
  console.log("developement db")
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
