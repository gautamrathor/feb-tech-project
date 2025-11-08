import express from  'express'
import "dotenv/config"
import { connectdb } from './config/db.js';
const app =  express() //created enstance of express 
import cors from 'cors'
import userRoutes from './router/routs.js';


app.use(express.json());




// cross origin resource sharing
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))

app.use('/api/user' , userRoutes)

connectdb().then(app.listen(process.env.PORT,()=>{  // function calling, this is callback function
    console.log(`server is running ${process.env.PORT}`);
}))




