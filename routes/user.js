import express from "express";

import {User} from "../model/index.js";

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
router.get("/users",async (req,res)=>{
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
router.delete("/users/:_id",async (req,res)=>{
    // console.log("delete method call")
    const {_id} = req.params
    try {
        const deleteUser = await User.findByIdAndDelete(_id)
        res.status(200).send(deleteUser)
    }catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

export default router;