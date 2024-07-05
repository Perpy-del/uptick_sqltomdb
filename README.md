# Uptick SQL

A simple application using NodeJS built on ExpressJS and PostgreSQL with Sequelize ORM. 

This repository contains the source code for the uptick_sql application. Follow the instructions below to set up the codebase on your local machine.

### Here is the [API Documentation](https://documenter.getpostman.com/view/26756602/2sA3duGZ88)

# Table of Contents

- ### [Prerequisites](https://github.com/Perpy-del/uptick_sql?tab=readme-ov-file#prerequisites-1)

- ### [Installation](https://github.com/Perpy-del/uptick_sql?tab=readme-ov-file#installation-1)

- ### [Configuration](https://github.com/Perpy-del/uptick_sql?tab=readme-ov-file#configuration-1)

- ### [Directory Structure](https://github.com/Perpy-del/uptick_sql?tab=readme-ov-file#directory-structure-1)

- ### [Usage](https://github.com/Perpy-del/uptick_sql?tab=readme-ov-file#usage-1)

- ### [Troubleshooting](https://github.com/Perpy-del/uptick_sql?tab=readme-ov-file#troubleshooting-1)

- ### [Project Status](https://github.com/Perpy-del/uptick_sql?tab=readme-ov-file#project-status-1)

- ### [License](https://github.com/Perpy-del/uptick_sql?tab=readme-ov-file#license-1)

- ### [Credits](https://github.com/Perpy-del/uptick_sql?tab=readme-ov-file#credits-1)

## Prerequisites

**[Back to Table of Contents](https://github.com/Perpy-del/uptick_sql?tab=readme-ov-file#table-of-contents)**

Before setting up the codebase, make sure you have the following prerequisites installed:

- Node.js (version 12 or above)
- PostgreSQL (version 4 or above)
- Git

## Installation

**[Back to Table of Contents](https://github.com/Perpy-del/uptick_sql?tab=readme-ov-file#table-of-contents)**

1. Clone the repository using Git:
   ```bash
   git clone https://github.com/Perpy-del/uptick_sql.git
   ```
2. Change into the project directory:

    ```bash
    cd uptick_sql
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Run the application

    ```bash
    npm run start
    ```

## Configuration

**[Back to Table of Contents](https://github.com/Perpy-del/uptick_sql?tab=readme-ov-file#table-of-contents)**

The codebase requires the following environment configurations:

1. Create a `.env` file in the root directory of the project.
2. Open the `.env` file and add the following configurations:

```bash

PORT=my-port

# NODE_ENV=production || development || test

# DATABASE ENVIRONMENT VARIABLES
DEV_DB_USERNAME=my-dev-db-user
DEV_DB_PASSWORD=my-dev-db-pwd
DEV_DB_DATABASE=my-dev-db-database
DEV_DB_HOST=my-dev-db-host
# DEV_DB_DIALECT=postgres
DEV_DB_PORT=my-dev-db-port

STAGING_DB_USERNAME=my-staging-db-user
STAGING_DB_PASSWORD=my-staging-db-password
STAGING_DB_DATABASE=my-staging-db-database
STAGING_DB_HOST=my-staging-db-host
# STAGING_DB_DIALECT=postgres
STAGING_DB_PORT=my-staging-db-port

PROD_DB_USERNAME=my-prod-db-user
PROD_DB_PASSWORD=my-prod-db-password
PROD_DB_DATABASE=my-prod-db-database
PROD_DB_HOST=my-prod-db-host
# PROD_DB_DIALECT=postgres
PROD_DB_PORT=my-prod-db-port

# HASHING
DEV_BCRYPT_SALT_ROUND=my-dev-bcrypt-salt-round

#JSON WEB TOKEN
DEV_JWT_EXPIRY_TIME=my-dev-jwt-expiry
DEV_APP_SECRET=my-dev-app-secret
DEV_JWT_ISSUER=my-dev-jwt-issuer

PROD_JWT_EXPIRY_TIME=my-prod-jwt-expiry
PROD_APP_SECRET=my-prod-app-secret
PROD_JWT_ISSUER=my-prod-jwt-issuer

```

## Directory Structure

**[Back to Table of Contents](https://github.com/Perpy-del/uptick_sql?tab=readme-ov-file#table-of-contents)**

The codebase follows the following directory structure:

```bash
uptick_sql/
└───app
    ├───http
        ├───controllers
        ├───middlewares
        ├───routes
    ├───errors
    ├───services
    ├───utilities
└───config
└───db
    ├───migrations
    ├───models
    ├───seeders
```

- `app/`:Contains the main source code files
- `config/`:Contains the config files for the codebase.
- `db/`:Contains the data store files for the codebase.

## Usage

**[Back to Table of Contents](https://github.com/Perpy-del/uptick_sql?tab=readme-ov-file#table-of-contents)**

To start the uptick_sql application on your local environment, run the following command:

npm run start:dev

Visit `http://localhost:PORT/api` in your web browser to access the application.

**Base URL**
Main URL
https://uptick-sql.onrender.com/api

## Troubleshooting

**[Back to Table of Contents](https://github.com/Perpy-del/uptick_sql?tab=readme-ov-file#table-of-contents)**

- If you encounter any issues during the setup process, please ensure that you have the latest versions of Node.js and PostgreSQL installed.
- If the application fails to start, make sure the PostgreSQL server is running and accessible.

## Project Status

**[Back to Table of Contents](https://github.com/Perpy-del/uptick_sql?tab=readme-ov-file#table-of-contents)**

This app is currently developed and maintained by me. The project is primarily for personal use or demonstration purposes.

## License

**[Back to Table of Contents](https://github.com/Perpy-del/uptick_sql?tab=readme-ov-file#table-of-contents)**

This codebase is released under the GNU General Public License(GPL). Please see the LICENSE.md file for more details.

## Credits

**[Back to Table of Contents](https://github.com/Perpy-del/uptick_sql?tab=readme-ov-file#table-of-contents)**

The uptick_sql App codebase is being developed by:
- [Perpetual Meninwa](https://github.com/Perpy-del)
- [Perpetual Meninwa's Portfolio](https://pm-portfolio-drab.vercel.app/)
- [Perpetual Meninwa's LinkedIn](https://linkedin.com/in/perpydev/)


