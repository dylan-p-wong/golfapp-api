import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import customerRoutes from './routes/customer-routes';

if (process.env.NODE_ENV !== 'PROD') {
    require('dotenv').config();
}

const app = express();
const port = process.env.port || 4000;

app.set('trust proxy', 1);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.use(cookieParser());
app.use('/customers', customerRoutes);

app.listen(port, () => {
    console.log(`Server running`);
});