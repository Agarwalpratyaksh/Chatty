import express from 'express'
import authRoute from './routes/auth.route'
import messagesRoute from './routes/message.route'
import { connectDb } from './lib/db'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const app = express()


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


app.use(express.json())
app.use(cookieParser())



app.use('/api/auth',authRoute)
app.use('/api/messages',messagesRoute)

app.listen(3000, () => {
    console.log('Example app listening on port 3000!'),
    connectDb()
})