import mongoose from "mongoose";

interface message{
    senderId: mongoose.Types.ObjectId,
    recieverId: mongoose.Types.ObjectId,
    image: string,
    text: string
}

const messageSchema = new mongoose.Schema<message>({
   
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    },
    recieverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    },
    text:{
        type: String
    },
    image:{
        type: String
    }
    

   
},{timestamps:true})


const messageModel = mongoose.model("message", messageSchema)

export default messageModel