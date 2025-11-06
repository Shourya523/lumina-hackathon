import cookieParser from "cookie-parser";
import express from 'express'
import dotenv from 'dotenv';
import { testroute } from './routes/testRoute.js';
import { userRoute } from './routes/user.route.js';
import { authRouter } from './routes/auth.route.js';
import cors from 'cors';
import router from './routes/cartRoutes.js';
dotenv.config();
export const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'],
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Origin', 'Accept'],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: true,
}));
app.use('/',testroute);
app.use('/api',userRoute);
app.use('/api/auth',authRouter);
app.use('/api/cart',router);
app.use((err,req,res,next)=>{
    const statuscode=err.statuscode || 500;
    const message=err.message || 'Internal Server Error';
    return res.status(statuscode).json({
        success:false,
        message,
        statuscode
    })
})