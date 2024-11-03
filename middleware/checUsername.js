import User from "../database/models/user.model.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const checkUserName = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            userName: req.body.userName
        }
    })

    if (user) {
        res.status(400).json({ message: "user already exist please signIn" })
    } else {
        next()
    }

}
/* 
to ensure that the userName is unique
*/


export const checkLogin = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            userName: req.body.userName
        }
    })

    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(404).json({ message: 'invalid userName or password' })
    } else {
        let token = jwt.sign({
            id: user.id,
            name: user.userName,
            role: user.role
        }, "userInfo")
        // res.status(200).json(token)
        req.token = token
        // to send token from middleware to signIn function in other bage
        next()

    }

}
/*
to ensure that user already signUp and compare password is true or not
and make token to user that signIn
token==> has id for user , userName , role of the user [admin , user]
*/

export const adminUser = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    jwt.verify(token, "userInfo", (err, decoded) => {
        if (err) return res.status(401).json({ message: "token error", err })
        if (decoded.role !== 'admin'){
        res.status(403).json({ error: 'admin only access to this ' });
        }else{
            req.user=decoded
            next()
        }

    })
}
/* 
to rnsure that is admin or not
*/

export const userToken = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    jwt.verify(token, "userInfo", (err, decoded) => {
        if (err) return res.status(401).json({ message: "token error", err })
            req.user=decoded
            next()
    })
}
/* 
token for user
*/