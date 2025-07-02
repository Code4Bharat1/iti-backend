import express from 'express';
import connectDB from './config/db.js'
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();
const app = express();

app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}));

app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))