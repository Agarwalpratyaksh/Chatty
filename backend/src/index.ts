import express from 'express'
import authRoute from './routes/auth.route'
import messagesRoute from './routes/message.route'
import { connectDb } from './lib/db'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { app, server } from './lib/socket'
import path from 'path'

dotenv.config()

const PORT = process.env.PORT




app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


app.use(express.json({limit:"30mb"}))
app.use(cookieParser())



app.use('/api/auth',authRoute)
app.use('/api/messages',messagesRoute)


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
      });
}


server.listen(PORT, () => {
    console.log('Example app listening on port'+ PORT),
    connectDb()
})