import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    contact:String,
    create_at:{
        type:Date,
        default: new Date(),
    }
})

const contactSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    phone:String,
    create_at:{
        type:Date,
        default: new Date(),
    }
})

const studentSchema = new mongoose.Schema({
    "name": {
        "type": "string"
    },
    "mobile": {
        "type": "string"
    },
    "course": {
        "type": "string"
    },
    "address": {
        "type": "string"
    },
    "create_at": {
        "type": "string"
    },
    "verified_by": {
        "type": "string"
    },
    "payment_status": {
        "type": "string"
    },
    "payment_mode": {
        "type": "string"
    }});


const User = mongoose.model("User",userSchema);
const Contact = mongoose.model("Contact",contactSchema)
const Student = mongoose.model("Student",studentSchema)
export {User,Contact,Student}