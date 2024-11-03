import express from 'express'
import { signIn, signUp } from './user.controller.js'
import { checkLogin, checkUserName } from '../../middleware/checUsername.js'

const userRoutes=express.Router()
// signUp
userRoutes.post("/signUp",checkUserName,signUp)
// signIn
userRoutes.post("/signIn",checkLogin,signIn)

export default userRoutes;