export const errorHandeler = (error,req,res,next) =>{
    res.status(500).send(error)
    next();
}