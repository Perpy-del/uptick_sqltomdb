import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import rotatingFileStream from '../config/logger.js';
import cors from 'cors';
import dotenv from 'dotenv'
import authRouter from './http/routes/authRouter.js'
import blogRouter from './http/routes/blogRouter.js';
import connectToDb from '../config/database.js';

dotenv.config();

const app = express();

connectToDb()

app.use(logger('combined', { stream: rotatingFileStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions = {
  origin: '*', // Adjust this to a specific domain or an array of domains if needed
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // List the methods you want to allow
  allowedHeaders: ['Content-Type', 'Authorization'], // List the headers you want to allow
  credentials: true, // If you want to allow cookies to be sent with requests
};

app.use(cors(corsOptions));

// Define routers
app.use(authRouter)
app.use(blogRouter);

app.get('/api', (req, res) => res.send('Welcome to Uptick with MongoDB!!! 😎'));

export default app;
