import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import rotatingFileStream from '../config/logger.js';
import cors from 'cors';
import dotenv from 'dotenv'
// import authRouter from './http/routes/authRouter.js'
// import blogRouter from './http/routes/blogRouter.js';
import connectToDb from '../config/database.js';

dotenv.config();

const app = express();

connectToDb()

app.use(logger('combined', { stream: rotatingFileStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Define routers
// app.use(authRouter)
// app.use(blogRouter);

app.get('/api', (req, res) => res.send('Welcome to UptickSQL!!! 😎'));

export default app;
