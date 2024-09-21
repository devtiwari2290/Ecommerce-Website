import { config } from "dotenv";
import mongoose from "mongoose";

const connectDB = async () =>{
    try {

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database Connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.log("Error while connecting to DB", error);
        
    }
}

export default connectDB