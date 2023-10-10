import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/error';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorMiddleware);

export default app;
