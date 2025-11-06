import express from 'express';
import { userRouteTest } from '../controllers/userRoute.controllers.js';
export const userRoute=express.Router();
userRoute.get('/user',userRouteTest);