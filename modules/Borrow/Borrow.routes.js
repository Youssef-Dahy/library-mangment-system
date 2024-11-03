import express from 'express'
import { borrowBook, borrowedBooks, returnBook } from './Borrow.controller.js'
import { userToken } from '../../middleware/checUsername.js'

const borrowRoutes=express.Router()

// borrowBook
borrowRoutes.post("/borrowBook/:bookId",userToken,borrowBook)
// returnedBook
borrowRoutes.post("/returnedBook/:bookId",userToken,returnBook)
// list of borrowedBook
borrowRoutes.get("/borrowedBooks",userToken,borrowedBooks)



export default borrowRoutes