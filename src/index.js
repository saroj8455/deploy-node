import express from "express"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import httpStatus from "http-status"
// validation of user input
import Joi from "joi"
import cors from "cors"
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message:"OK , API check done"
    })
})

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
    console.log(hashPwd)
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
        return res.status(200).json({
            username,password:hashPwd,validPassword
        })
    }catch (error) {
        return res.status(500).send("Something wrong please try after sometime")
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
