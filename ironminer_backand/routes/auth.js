import express from "express"
import bcrypt from 'bcrypt';
import User from '../models/user.js'; 
import jwt  from "jsonwebtoken";
const router = express.Router();
router.post('/signUp', async (req, res) => {
    try {
        const { firstName, 
                lastName,
                email,
                password,
                dob,
                iron,
                coins,
                balance  
                        } = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser)
            return res.status(400).json({ message: "User already exists!" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({firstName,
                                  lastName,
                                  email,
                                  password: hashedPassword,dob:new Date(dob),
                                  iron,
                                  coins,
                                  balance
        });
        await newUser.save();
        res.status(201).json({ message: "Success!" });
    } catch (error) {
        console.log("Server Error", error);
        res.status(500).json({ message: "Server Error" });
    }
});
router.post("/logIn",async(req,res)=>{
    const {email,password,remember} = req.body;
    const userValidater = await User.findOne({email});
    if(!userValidater)
        return res.status(404).json({message:"User not found"})
    const passValidater = await bcrypt.compare(password,userValidater.password);
    if(!passValidater)
        return res.status(400).json({message:"Invalid Password"});
      const token = jwt.sign(
        {
             id:userValidater._id,
             email:userValidater.email
        },process.env.JWTKEY,{expiresIn: remember?"7d":"1h"})
    return res.status(200).json({message:"Login Successfully",token,userInfo:{
        Name:userValidater.firstName,
        Iron:userValidater.iron,
        Coins:userValidater.coins,
        Balance:userValidater.balance
    }});
    })

export default router;
