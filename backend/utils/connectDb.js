import mongoose from "mongoose";
const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connect to database")

    }catch(error){

    }
}
export default connectDb