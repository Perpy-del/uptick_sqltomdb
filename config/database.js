const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('.');

const sequelize = new Sequelize(config[env]);

module.exports = sequelize;