import express from 'express';
import { app } from './app.js';
import { connectDB } from './database/mongodb.connection.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT=process.env.PORT || 8000;
connectDB().then(()=>{
    app.listen(PORT,(req,res)=>{
        console.log(`Server Connected At ${PORT}`);
    })
    console.log('MongoDB connected')
})
