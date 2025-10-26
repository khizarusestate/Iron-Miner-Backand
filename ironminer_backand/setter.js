import express, { json } from 'express';
import mongoose from 'mongoose';
import jwt  from "jsonwebtoken";
import user from './models/user.js';
const setter = express.Router();
setter.post("/userdata",async(req,res)=>{
    
})