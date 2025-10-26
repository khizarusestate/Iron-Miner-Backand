import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    dob:{type:Date,required:true},
    iron:{type:Number},
    coins:{type:Number},
    balance:{type:Number}
},{timestamps:true})
const user = mongoose.model("User",userSchema);
export default user;