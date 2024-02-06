
import Note from "../models/Catatan.js"

export const getNote = async (req,res) =>{
    try {
        const note = await Note.findAll({
            attributes: ['catatan']
        })
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })        
    }
}

export const getNoteById = async (req,res) => {
    try {
        const noteId = await Note.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!noteId) return res.status(403).json({ message : 'Id user tidak ada'})

        const note = await Note.findAll({
            attributes: ['catatan'],
            where: {
                id: noteId.id    
            }
        })

        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const createNote = async (req,res) => {
    const {catatan} = req.body
    try {
        await Note.create({
            catatan: catatan          
        })
        res.status(200).json({message: 'create Note success'})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const noteUpdate = async (req,res) => {
    try {
        const note = await Note.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!note) return res.status(401).json({ message: "Update id tidak ada"})
        const {catatan} = req.body
        await Note.update({
            catatan: catatan
        }, {
            where: {
                id: note.id
            }
        })
        res.status(200).json({
            message: "update data success"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })        
    }
}

export const noteDelete = async (req,res) => {
    try {
        const user = await Note.findOne({
            where : {
                id: req.params.id
            }
        })
        
        if(!user) return res.status(403).json({message: "Id user tidak ada "})
        // const {id} = req.params.id
    const hapusData = await Note.destroy({
        where: {
            id: user.id
        }
    })
    
    if(!hapusData) return res.status(203).json({ message: "data anda sudah dihapus"})

        res.status(200).json({
            message: "delete data success"
        })
        return;
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}