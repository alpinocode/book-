import express from 'express'
import {
    getNote,
    getNoteById,
    createNote,
    noteUpdate,
    noteDelete
} from '../controllers/NoteController.js'


const router = express.Router()

router.get('/user/note', getNote)
router.get('/user/note/:id', getNoteById)
router.post('/user/note', createNote)
router.put('/user/note/:id', noteUpdate)
router.delete('/user/note/:id', noteDelete)

export default router