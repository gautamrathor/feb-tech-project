import mongoose from "mongoose";

 const userschema=new mongoose.Schema({
    fullname:{type:String},
    email: {type:String, required:true , unique:true},
    password:{type:String, required:true },
    image: { type: String } // ✅ new field for image URL
},{timestamps:true}) 

export const usermodel = mongoose.model('user',userschema)