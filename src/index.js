import express from "express"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import httpStatus from "http-status"
import * as dotenv from "dotenv"
// validation of user input
import Joi from "joi"
import cors from "cors"
import mongoose from "mongoose";
import router from "../routes/user.js";

dotenv.config();

const app = express()
const REMOTE_DB = process.env.REMOTE_DB
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
/**
 * Prepare a remote connection for mongo db
 */
const remoteConnection = async () =>{
    try{
        await mongoose.connect(REMOTE_DB)
        console.log("Connect to remote db")
        return "Connected to Remote Database."
    }catch (e) {
        console.log(e)
        return "Database connection Error: Something went wrong Please try after sometime."
    }
}
// call remote connection
remoteConnection();
app.get('/', async (req, res) => {
    const dbStatus = await remoteConnection();
    res.json({
        message:"OK , API check done",
        dbStatus
    })
})

app.use("/",router)

/**
 * @username,@password
 * Auth api end point
 */

app.post("/auth",async (req,res)=>{
    const loginSchema = Joi.object({
        username:Joi.string().min(6).required().email(),
        password:Joi.string().min(3).required()
    })
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash("ocemdev",salt)
    // console.log(hashPwd)
    const {username,password} = req.body;
    if (!username || !password) {
        res.status(400).send({
            message:"Enter username and password is mandatory field"
        })
        return;
    }
    // check password
    const validPassword = await bcrypt.compare(password,hashPwd);
    if(!validPassword) return res.status(400).send({
        message:"Incorrect Password"
    })
    try {
        const {error} =  loginSchema.validate(req.body);
        if (error) {
            return  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                error
            });
        }
        const token = jwt.sign({username},process.env.JWT_TOKEN,{expiresIn: '1h'})
        res.header("Authorization",token)
        return res.status(200).json({
            username,token,validPassword
        })
    }catch (error) {
        return res.status(500).send("Something wrong please try after sometime")
    }
})


app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
})
