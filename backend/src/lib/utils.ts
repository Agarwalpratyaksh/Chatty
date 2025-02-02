
import jwt from 'jsonwebtoken'
import express from 'express'

export const generateToken = (userId: any, res: express.Response)=>{

    const secret = process.env.JWT_SECRET
    if(!secret){
        console.log("JWT sectet is undefined")
        return 
    }
    const token = jwt.sign({userId},secret,{
        expiresIn: '7d'
    })

    res.cookie('token',token,{
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
    })


    return token

}

