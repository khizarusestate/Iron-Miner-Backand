import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import ServerlessHttp from "serverless-http"
import router from "../routes.js"
import Compresser from "../routes/compresser.js"
dotenv.config();
console.log("MONGO URL:", process.env.MONGO_URL);
const app =  express();
app.use(cors());
app.use(express.json());
const Mongo_connecter = async ()=>{
    try{
   await mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
   console.log("Mongo DB connected successfully")
}
    catch(error){
    console.log("Mongo DB connection error:",error.message)
}}
Mongo_connecter();
app.use("/auth",router);
app.use("/CompIron",Compresser);
const handler = Serverless(app);
export default handler;