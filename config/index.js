require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_DATABASE,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    dialect: "postgres",
  },
  test: {
    username: process.env.STAGING_DB_USERNAME,
    password: process.env.STAGING_DB_PASSWORD,
    database: process.env.STAGING_DB_DATABASE,
    host: process.env.STAGING_DB_HOST,
    port: process.env.STAGING_DB_PORT,
    dialect: process.env.STAGING_DB_DIALECT || "postgres",
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // This will force SSL
        rejectUnauthorized: false // This avoids self-signed certificate errors
      }
    },
  },
};
