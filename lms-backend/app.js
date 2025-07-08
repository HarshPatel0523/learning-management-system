import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js';

import { config } from 'dotenv';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middlewares.js';
config();

const app = express();

app.use(express.json());   
app.use(cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
    credentials: true
}));

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);

app.use('/ping', (req, res) => {
    res.status(200).json({ message: 'pong' });
});

app.all('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

app.use(errorMiddleware)

export default app;