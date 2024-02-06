import express from 'express'
import {
    getUser,
    Register
} from '../controllers/UserController.js'

const router = express.Router()

router.get('/user', getUser)
router.post('/register',  Register )

export default router