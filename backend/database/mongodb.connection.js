import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connectDB=async()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        
    } catch (error) {
        console.log("MongoDB Error: ", error);
        process.exit(1);
        
    }
}