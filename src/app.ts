import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/error';
import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRoutes';
import ocurrencyRoutes from './routes/ocurrencyRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/ocurrency', ocurrencyRoutes);
app.use(loginRoutes);

app.use(errorMiddleware);

export default app;
