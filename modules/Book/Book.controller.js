import { Op } from "sequelize";
import Book from "../../database/models/book.model.js";

// add Book
const addBook = async (req, res) => {
    req.body.adminId = req.user.id;
    const book = await Book.create(req.body)
    res.status(201).json({ message: "Book Added", book })
}

// updateBook
const updateBook = async (req, res) => {
    let {id} = req.params;
    // id for book i wanna update 
    req.body.adminId = req.user.id;
    // id for admin 
    const book = await Book.findByPk(id)
    // search for book i wanna update 
    if (!book) return res.status(404).json({ message: "Book Not Found" })
    // are the book found or not
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.genre = req.body.genre || book.genre;
    await book.save()
    res.status(200).json({message:"book updated",book})
    // replace the old values with new values and send the new book
}

// delete Book
const deleteBook = async (req, res) => {
    let {id} = req.params;
    // id for book i wanna delete 
    const book = await Book.findByPk(id)
    // search for book i wanna delete 
    if (!book) return res.status(404).json({ message: "Book Not Found" })
    // are the book found or not
    await book.destroy()
    res.status(200).json({message:"Book Deleted"})
    // delete Book
}

// get all book
const allBooks=async(req,res)=>{
    const books=await Book.findAndCountAll({
        attributes:{
            exclude:["adminId","createdAt","updatedAt"]
        }
    })
    // array contain all books
    res.status(200).json({message:"All Books",books})
}

// search specific book
const searchBooks = async (req, res) => {
    let{value}=req.params;
      const books = await Book.findAll({
        where: {
          [Op.or]: [
            { title: value },
            { author: value },
            { genre:value},
          ]
        },
        // op.or operation for search with multi condition
      });
      res.status(200).json({message:"all books you search about them",books});
    
  };


export {
    addBook,
    updateBook,
    deleteBook,
    allBooks,
    searchBooks
}