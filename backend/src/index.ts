import express from 'express'
import authRoute from './routes/auth.route'
import { connectDb } from './lib/db'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()



app.use(express.json())
app.use(cookieParser())



app.use('/auth',authRoute)

app.listen(3000, () => {
    console.log('Example app listening on port 3000!'),
    connectDb()
})