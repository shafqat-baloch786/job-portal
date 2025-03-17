import mongoose from "mongoose";
import dotenv from "dotenv";

// Loading environment variables from utils/.env
dotenv.config({ path: "./utils/.env" });

console.log("Connection String:", process.env.CONNECTION_STRING);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("An error occurred while connecting to DB:", error);
    }
};

export default connectDB;
