// const express = require("express")
import morgan from "morgan";
import express from "express" //as we changed type to module hence require would not work
import dotenv from "dotenv"
import mogan from 'morgan'
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
//configure env
dotenv.config();

//connect database
connectDB();

//rest object 
const app = express()

//middleware
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth',authRoutes)

//rest api
app.get('/',(req,res)=>{

    res.send({
        message:"Welcome to ecommerce app"
    })
})

//PORT
const PORT = process.env.PORT || 8080 ;

//run listen

app.listen(PORT,()=>{

    console.log(`server running on ${PORT}`)
})