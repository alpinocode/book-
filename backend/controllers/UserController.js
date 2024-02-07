import Users from "../models/UserModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const getUser = async (req, res) => {
    try {
        const user = await Users.findAll({
            attributes: ['name', 'email'],
        })
        if(!user) return res.status(403).json({message: "User tidak ada"})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const Register = async (req,res) => {
    const {name, email, password, confPassword} = req.body
    if(password !== confPassword) return res.status(401).json({ message: 'Wrong password'})
    const salt = await bcrypt.genSalt()
    const hastPassword = await bcrypt.hash(password, salt)
    
    try {
        await Users.create({
            name: name,
            email: email,
            password: hastPassword
        })
        res.status(200).json({message: 'create to register'})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const Login = async (req,res) => {
    try {
       const user = await Users.findAll({
            where: {
                email: req.body.email
            }
       })
        const match = await bcrypt.compare(req.body.password, user[0].password)
        if(!match) return res.status(403).json({message: "Wrong password"})
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '30s'
        })
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        })
        await Users.update({refresh_token: refreshToken },{
            where: {
                id: userId
            }
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge:  24 * 60 * 60 * 1000
        })
        res.status(200).json(accessToken)
    } catch (error) {
        // console.log(error)
        res.status(401).json({
            message: "email sudah ada"
        })    
    }
}

export const Logout = async (req,res) => {
        const refreshToken = await req.cookie.refreshToken
        if(!refreshToken) return res.sendStatus(204)
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        })
        if(!user[0]) await res.sendStatus(204)
        const userId = user[0].id
        await Users.update({refreshToken: null}, {
            where: {
                id: userId
            }
        })
        res.clearCookie('refreshToken')
        return res.sendStatus(200)
}