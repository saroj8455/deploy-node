import express from "express";

import {Student} from "../model/index.js";
import {errorHandeler} from "../utils/errorHandeler.js"
import httpStatus from "http-status";
const studentRouter = express.Router();

/**
 *
 * Check Health Point
 */

studentRouter.get("/student",async (req,res,next)=>{
    try {
        const students = await Student.find({});
        res.status(httpStatus.OK).send({
            count:students.length,
            students
        })
    }catch (error) {
        next(error)
    }

})

/**
 *
 * Create a new contact
 * @first_name,@last_name,@email,@phone
 */
studentRouter.post("/student",async (req,res,next)=>{
    // const {first_name,last_name,email,phone} = req.body;

    try {
        const newStudent = new Student(req.body)
        await newStudent.save();
        res.status(httpStatus.CREATED).send(newStudent);
    }catch (error) {
        next(error)
    }

})

/**
 * Get all contacts list
 */
// contactRouter.get("/contact",async (req,res,next)=>{
//     try {
//         const contacts = await Contact.find({});
//         res.status(200).send({
//             count:contacts.length,
//             contacts
//         })
//     }catch (error) {
//         next(errorHandeler())
//     }
// })
/**
 * Update a specific contact
 * @id as params
 */
// contactRouter.put("/contact/:_id",async (req,res,next)=>{
//     const {_id} = req.params;
//     const {first_name,last_name,email,phone} = req.body;
//     try {
//         const updateContact = await Contact.findByIdAndUpdate(_id,{first_name,last_name,email,phone},{new:true})
//         res.status(200).send(updateContact)
//     }catch (error) {
//         next(error)
//     }
// })

/**
 * Delete contact from list
 */
// contactRouter.delete("/contact/:_id",async (req,res,next)=>{
//     // console.log("delete method call")
//     const {_id} = req.params
//     try {
//         const checkContact = await Contact.findById({_id});
//         // if(!checkContact) return res.status(httpStatus.NOT_FOUND).send({
//         //     message:`Contact details not found of the  ${_id}`
//         // })
//         const contact = await Contact.deleteOne({_id})
//         // console.log(deleteContact) { acknowledged: true, deletedCount: 1 }
//         if(!contact.deletedCount > 0) return res.status(httpStatus.NOT_FOUND).send({
//             message:`Contact already delete from book: ${_id}`
//         })
//         return res.status(200).send({
//             message:`Contact delete from book: ${_id}`,
//             contact
//         })
//
//     }catch (error) {
//         next(error)
//     }
// })


export default studentRouter;