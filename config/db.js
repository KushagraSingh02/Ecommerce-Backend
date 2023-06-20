import mongoose from 'mongoose'

//Connect to mongodb database

const connectDB = async ()=>{

    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connect to mondodb database ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in mongdodb ${error}`);
    }
}

export default connectDB;