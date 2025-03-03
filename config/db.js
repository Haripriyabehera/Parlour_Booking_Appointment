import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
try{
    const db = await mongoose.connect(process.env.MONGO_URL)
    console.log(`MongoDB Connected: ${db.connection.host}`)
}
catch (error){
    console.log(`Error: ${error.message}`)
    process.exit(1)
}
}

export default connectDB