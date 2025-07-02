import express from 'express'
import cors from 'cors'
import "dotenv/config"
import { connectDB } from './config/db.js'
import userRouter from './routes/userRoutes.js'
import taskRouter from './routes/taskRoutes.js'

const app = express(); // Correctly defined as 'app' (lowercase)
const port = process.env.PORT || 4000;

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//DB CONNECT 
connectDB();

//Routes
app.use("/api/user", userRouter)
app.use("/api/tasks", taskRouter);

app.get('/', (req,res)=>{
    res.send('API WORKING')
})

app.listen(port,()=>{ // Changed from App.listen to app.listen
    console.log(`Server Started on http://localhost:${port}`)
})