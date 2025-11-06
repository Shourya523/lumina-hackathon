import express from 'express';
export const testroute=express.Router();
testroute.get('/test',(req,res)=>{
    res.json({message:'API is working'})
});
