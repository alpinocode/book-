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
                email: req.params.id
            }
        })
        const match = await bcrypt.compare(req.params.password, user[0].password)
        if(!match) return res.status(403).json({message: "Wrong password"})
        const userId = user[0].id;
        const name = user[0].id;
        const email = user[0].id;
        const accessToken = jwt.sign({userId, name, email}, ACCESS_TOKEN_SECRET,{
            expiresIn: '60d'
        })
        const refreshToken = jwt.sign({userId, name, email}, REFRESH_TOKEN_ACCESS,{
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
    } catch (error) {
        res.status(401).json({
            message: "No email"
        })    
    }
}