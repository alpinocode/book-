import express from 'express'
import {
    getUser,
    Register,
    Login,
    Logout
} from '../controllers/UserController.js'
import {
    RefreshToken
} from '../controllers/RefreshToken.js'
import { 
    VerifyToken
} from '../middleware/VerifyToken.js'
import {
    getNote,
    getNoteById,
    createNote,
    noteUpdate,
    noteDelete
} from '../controllers/NoteController.js'


const router = express.Router()

router.get('/user', VerifyToken,getUser, getNote, getNoteById, createNote, noteUpdate, noteDelete)
router.post('/register', Register )
router.post('/login', Login)
router.get('/token', RefreshToken)
router.delete('/logout', Logout)

export default router