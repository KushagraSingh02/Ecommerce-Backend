// const express = require("express")
import morgan from "morgan";
import express from "express" //as we changed type to module hence require would not work
import dotenv from "dotenv"
import mogan from 'morgan'
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
//configure env
// import { MongoClient } from "mongodb";
// import { ServerApiVersion } from "mongodb";
// const uri = "mongodb+srv://kushagra:kushagra@cluster0.sui78iu.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("ecommerce").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

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