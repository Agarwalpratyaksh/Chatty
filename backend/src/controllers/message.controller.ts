import express from 'express'
import userModel from '../models/user.model';
import messageModel from '../models/message.model';
import cloudinary from '../lib/cloudinary';

export const getUsersForSidebar = async (req: express.Request, res: express.Response) => {
    
    try {
        const loggedInUser = req.user
        const loggedInUserId = loggedInUser._id;

        const allUsers  = await userModel.find({_id:{$ne: loggedInUserId}}).select("-password")

        res.status(200).json(allUsers)

        
    } catch (error) {
        console.log("Error in getting other users",error)
        res.status(500).json({message:"Error in getting other users"})
    }

}


export const getMessagesForChat = async(req: express.Request, res: express.Response) => {
    try {

        const myId = req.user._id
        const othersId = req.params.id

        const messages = await messageModel.find({
            $or:[
                {recieverId: myId, senderId: othersId},
                {recieverId: othersId, senderId: myId}
            ]
        })

        res.status(200).json(messages)

        
    } catch (error) {
        console.log("Error in getting messages",error)
        res.status(500).json({message:"Error in getting messages"})
    }
}


export const sendMessage = async (req: express.Request, res: express.Response) => {

    try {
        const myId = req.user._id
        const othersId = req.params.id
        const {text, image} = req.body

        if(!text && !image){
            res.status(400).json("Text or image is required")

        }

        let imageUrl;

        if(image){
            const uploadImage = await cloudinary.uploader.upload(image)
            imageUrl= uploadImage.secure_url;
        }

        const newMessage = new messageModel({
            recieverId: othersId,
            senderId: myId,
            text: text,
            image: imageUrl
        })

        await newMessage.save()

        res.status(200).json(newMessage)
        
    } catch (error) {
        console.log("Error in sending message",error)
        res.status(500).json({message:"Error in sending message"})
        
    }
    
}