import jwt from "jsonwebtoken";
import httpStatus from "http-status";

export const authVerify = (req,res,next) =>{
    const token = req.header("Authorization");
    // console.log(token)
    if (!token) return res.status(httpStatus.UNAUTHORIZED).send({
        message:"Access Denied"
    })
    try {
        const verified = jwt.verify(token,process.env.JWT_TOKEN)
        // console.log(verified)
        req.user = verified;
        next()
    }catch (error) {
        res.status(httpStatus.NOT_ACCEPTABLE).send({
            message:"Invalid token"
        })
    }
}
