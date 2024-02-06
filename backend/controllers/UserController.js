import Users from "../models/UserModel.js";
import jtw from 'jsonwebtoken'
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
        console.log(error)
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
        if(!match) return res.status(403).json("Wrong password")
        const userId = user[0].id
        const userName = user[0].name
        const userEmail = user[0].email

        const accessToken = jwt.sign({userId,userName, userEmail }, ACCESS_TOKEN_SECRET, {
            expiresIn: '60s'
        })
        const refreshToken = jwt.sign({userId, userName, userEmail}, REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        await Users.update({refresh_token: refreshToken}, {
            where: {
                id: userId
            }
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // only http access is allowed
            maxAge: 24 * 60 * 60 * 1000  // setting 1 day
        })
        res.status(200).json(accessToken)
    } catch (error) {
        res.status(401).json({
            message: "email tidak ada"
        })
    }
}