import express from 'express'
import { addBook, allBooks, deleteBook, searchBooks, updateBook } from './Book.controller.js'
import { adminUser } from '../../middleware/checUsername.js'

const bookRoutes=express.Router()

//add Book
bookRoutes.post("/addBook",adminUser,addBook)

// update Book
bookRoutes.put("/updateBook/:id",adminUser,updateBook)

// delete Book
bookRoutes.delete("/deleteBook/:id",adminUser,deleteBook)

// all Books
bookRoutes.get("/allBooks",allBooks)

// all Books you searched
bookRoutes.get("/searchBook/:value",searchBooks)

export default bookRoutes