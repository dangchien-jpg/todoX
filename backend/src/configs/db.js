import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECT_STRING_DATABASE);
        console.log("Connect database successfully");
    } catch (error) {
        console.log("Connect database failed :",error);
        process.exit(1);
    }
}

export default connectDB;