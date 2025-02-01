import mongoose from "mongoose";

interface user{
    email : string,
    password : string,
    fullName : string,
    profilePic : string
}

const userSchema = new mongoose.Schema<user>({
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLenght: 5
    },
    fullName:{
        type: String,
        required: true  
    },
    profilePic:{
        type: String,
        default:""
    },

   
},{timestamps:true})


const userModel = mongoose.model("user", userSchema)

export default userModel