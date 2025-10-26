import express, { json } from 'express';
import mongoose from 'mongoose';
import jwt  from "jsonwebtoken";
import user from '../models/user.js';
const Compresser = express.Router();
Compresser.post("/NewIron",async (req,res)=>{
    const{ironAmount} = req.body;
    const{authorization} = req.headers;
    const token = authorization.split(" ")[1];
    let decoded;
    try{
        decoded = jwt.verify(token,process.env.JWTKEY);
    }catch {
        return res.status(403);
    }
    const findUser = await user.findById(decoded.id)
    if(!findUser)
        return res.status(404);
    findUser.iron -= ironAmount; 
    findUser.coins += ironAmount/1000;
    const newIron = findUser.iron;
    const newCoins = findUser.coins;
    await findUser.save();
    res.status(200).json({newIron,newCoins});
})
    export default Compresser;
