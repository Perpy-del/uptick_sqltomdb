import express from 'express';
import cookieParser from 'cookie-parser';
// import logger from 'morgan';
// import rotatingFileStream from '../config/logger';
import cors from 'cors';
import dotenv from 'dotenv'
import authRouter from './http/routes/authRouter'
import blogRouter from './http/routes/blogRouter';
import connectToDb from '../config/database';

dotenv.config();

const app = express();

connectToDb()

// app.use(logger('combined', { stream: rotatingFileStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Define routers
app.use(authRouter)
app.use(blogRouter);

app.get('/api', (req, res) => res.send('Welcome to Uptick with MongoDB!!! 😎'));

export default app;
