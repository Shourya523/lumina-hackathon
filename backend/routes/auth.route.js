import express from 'express'
import { googleSignIn, signin, signup,signout } from '../controllers/auth.controller.js';

export const authRouter=express.Router();
authRouter.post("/signup",signup);
authRouter.post("/signin",signin);
authRouter.get("/signout",signout);
authRouter.post("/google-signin",googleSignIn);