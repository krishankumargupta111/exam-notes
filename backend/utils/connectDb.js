import mongoose from "mongoose";
const connectDb=async()=>{
    try{
        console.log("MONGODB_URL =", process.env.MONGODB_URL);

    console.log("JWT_SECRET =", process.env.JWT_SECRET);
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connect to database")

    }catch(error){

    }
}
export default connectDb
