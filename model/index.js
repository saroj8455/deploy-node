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

const User = mongoose.model("User",userSchema);

export {User}