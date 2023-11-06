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

const User = mongoose.model("User",userSchema);
const Contact = mongoose.model("Contact",contactSchema)

export {User,Contact}