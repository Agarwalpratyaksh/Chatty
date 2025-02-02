import express from 'express'
import { getMessagesForChat, getUsersForSidebar, sendMessage } from '../controllers/message.controller'
import { protectedRoute } from '../middleware/auth.middleware'

const router = express.Router()

router.get('/',(req,res)=>{
    res.send("message route")
})

router.get('/users', protectedRoute ,getUsersForSidebar)
router.get('/:id', protectedRoute,getMessagesForChat)
router.post('/send/:id', protectedRoute,sendMessage)

export default router

