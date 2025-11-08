import mongoose from "mongoose";


export const connectdb = async () =>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log('DATA BASE CONNECTED IS SUCCESSFULLY');
        
    } catch (error) {
        console.log('error db');
        
    }
}
