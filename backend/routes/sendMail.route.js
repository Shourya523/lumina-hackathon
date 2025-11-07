import express from 'express'
import { sendMail } from '../controllers/sendMail.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

export const sendMailRoute=express.Router();
sendMailRoute.post("/sendmail",verifyToken,sendMail);