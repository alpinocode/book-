import jwt from 'jsonwebtoken'

export const VerifyToken = async (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if( token === null ) return res.sendStatus(401)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
            if(err) return res.sendStatus(403)
            req.email = result.email
            next()
        })

}