import express from 'express';
import { checkAuth, login, logout, signup, updateProfile } from '../controllers/auth.controller';
import { protectedRoute } from '../middleware/auth.middleware';

const router = express.Router();


router.post('/', (req,res)=>{
    console.log("hello"),
    res.json({message:"hello"})
})

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/updateProfile', protectedRoute,updateProfile)
router.get('/checkAuth', protectedRoute, checkAuth)

export default router;