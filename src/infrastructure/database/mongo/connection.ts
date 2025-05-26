import mongoose from "mongoose";
import { ENV } from "../../../config/env";


const connectToMongoDB = async ()=>{
    const url = ENV.DATABASE_URL;
    if (!url) {
    console.error('❌ DATABASE_URL not set in .env file');
    process.exit(1);
  }
  try {
    await mongoose.connect(url);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
  console.error('❌ MongoDB connection error:', error);
    process.exit(1);  
  }
}

export default connectToMongoDB