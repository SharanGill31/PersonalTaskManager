import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://sharangill:3108023600@cluster0.ml7kl.mongodb.net/TaskPulse')
    .then(()=>console.log(('DB CONNECTED')))
}