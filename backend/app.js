import express from 'express'
import dotenv from 'dotenv';
import { testroute } from './routes/testRoute.js';
import { userRoute } from './routes/user.route.js';
import { authRouter } from './routes/auth.route.js';
import { status } from 'init';
import cors from 'cors';
dotenv.config();
export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors()
);
app.use('/',testroute);
app.use('/api',userRoute);
app.use('/api/auth',authRouter);
app.use((err,req,res,next)=>{
    const statuscode=err.statuscode || 500;
    const message=err.message || 'Internal Server Error';
    return res.status(statuscode).json({
        success:false,
        message,
        statuscode
    })
})