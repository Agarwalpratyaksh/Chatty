import express from "express"
import jwt from 'jsonwebtoken'
import userModel from "../models/user.model";

export  const protectedRoute = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const token = req.cookies.token;

    if(!token){
        res.status(401).json({message:"Unauthorized: No token in cookie"})
        return
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET as string)

    if(!decode){
        res.status(401).json({message:"Unauthorized: Invalid or wrong token in cookie"})
        return
    }

    //@ts-ignore
    const user = await userModel.findById(decode.userId).select("-password")

    if(!user){
        res.status(401).json({message:"Unauthorized: User not found"})
        return
    }

    //extended the req but making custom.d.ts
    req.user = user
    next()
    } catch (error) {
        console.log("Error in the authentication middleware", error)
        res.status(500).json({message:"Error in the authentication middleware"})
    }

}