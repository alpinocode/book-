import express from 'express'
import {
    getUser,
    Register,
    Login
} from '../controllers/UserController.js'
import {
    RefreshToken
} from '../controllers/RefreshToken.js'
import { 
    VerifyToken
} from '../middleware/VerifyToken.js'


const router = express.Router()

router.get('/user', VerifyToken,getUser)
router.post('/register', Register )
router.post('/login', Login)
router.get('/token', RefreshToken)


export default router