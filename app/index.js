const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rotatingFileStream = require('../config/logger');
const cors = require('cors');
require('dotenv').config();
const authRouter = require('./http/routes/authRouter')
const blogRouter = require('./http/routes/blogRouter');


const app = express();

app.use(logger('combined', { stream: rotatingFileStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Define routers
app.use(authRouter)
app.use(blogRouter);

app.get('/api', (req, res) => res.send('Welcome to UptickSQL!!! 😎'));

module.exports = app;
