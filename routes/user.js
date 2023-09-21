import express from "express";

import {User} from "../model/index.js";
import {authVerify} from "../utils/authVerify.js";

const router = express.Router();
/**
 *
 * Create a new user
 * @name,@email,@age
 */
router.post("/users",async (req,res)=>{
    const {name,email,age} = req.body;

    try {
        const user = new User({
            name,email,age
        })
        await user.save();
        res.status(201).send(user);
    }catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

})

/**
 * Get all users list
 */
router.get("/users",authVerify,async (req,res)=>{
    try {
        const users = await User.find({});
        res.status(200).send({
            count:users.length,
            users
        })
    }catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
/**
 * Update a specific user
 * @id as params
 */
router.put("/users/:_id",async (req,res)=>{
    const {_id} = req.params;
    const {name,email,age} = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(_id,{name,email,age},{new:true})
        res.status(200).send(updateUser)
    }catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

/**
 * Delete a user
 */
router.delete("/users/:_id",async (req,res,next)=>{
    // console.log("delete method call")
    const {_id} = req.params
    try {
        const deleteUser = await User.findOneAndDelete(_id)
        res.status(200).send(deleteUser)
    }catch (error) {
        // console.log(error)
        // res.status(500).send(error)
        next(error)
    }
})

export const userErrorHandeler = (error,req,res,next) =>{
    res.status(500).send(error)
    next();
}

router.use(userErrorHandeler)

export default router;