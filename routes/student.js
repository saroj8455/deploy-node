import express from "express";

import {Student} from "../model/index.js";
import {errorHandeler} from "../utils/errorHandeler.js"
import httpStatus from "http-status";
const studentRouter = express.Router();
import * as fs from 'fs';
import multer from 'multer';
import path from 'path';
import * as uuid from 'uuid';
import sharp from "sharp";

// const UPLOAD_PATH = path.join(path.resolve(), '/uploads');
//
// // File Upload
// const storage = multer.diskStorage({
//     destination: './uploads',
//     filename: (req, file, cb) => {
//         cb(null, uuid.v4() + '_' + file.originalname);
//     },
// });
//
// const upload = multer({ storage: storage });

// Testing
const storage = multer.memoryStorage();
const upload = multer({ storage });

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

studentRouter.post(
    '/student/upload', upload.single('image'),
    async (req,res,next) => {
        fs.access('./uploads', (error) => {
            if (error) {
                fs.mkdirSync('./uploads');
            }
        });
        // const { filename: image } = req.file;
        // await sharp(req.file.path)
        //
        //     .resize(200, 200)
        //
        //     .jpeg({ quality: 90 })
        //
        //     .toFile(
        //
        //         path.resolve(req.file.destination,'resized',image)
        //
        //     )
        //
        // fs.unlinkSync(req.file.path)
        // res.status(201).jsonp({ file: req.file?.filename });
        const { buffer, image } = req.file;
        console.log(buffer);
        console.log(image);
        // const link = `http://localhost:3000/${ref}`;
        // return res.json({ link });
    }
);

studentRouter.post("/student/uploadtest", upload.single("picture"), async (req, res) => {
    fs.access("./uploads", (error) => {
        if (error) {
            fs.mkdirSync("./uploads");
        }
    });
    const { buffer, originalname } = req.file;
    const timestamp = new Date().toISOString();
    const ref = `${timestamp}-${originalname}.webp`;
    await sharp(buffer)
        .webp({ quality: 20 })
        .toFile("./uploads/" + ref);
    // http://localhost:3000/uploads/2023-11-07T09:42:42.331Z-10780582_19199540.jpg.webp
    const link = `http://localhost:3000/uploads/${ref}`;
    return res.json({ link });
});

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