import Book from "../../database/models/book.model.js";
import Borrow from "../../database/models/borrow.model.js";


// borrowBook
const borrowBook = async (req, res) => {
    const { bookId } = req.params;
    const userId = req.user.id;
    // get bookId from param to search about book 
    // get userId from decoded token

    const book = await Book.findByPk(bookId);
    if (!book || !book.available) {
        res.status(404).json({ message: "Book not available" })
        // search about book by bookId
        // check if book available or not 
    } else {
        const borrow = await Borrow.create({ bookId, userId })
        book.available = false
        await book.save()
        res.status(200).json({ message: "borrowed success", borrow })
        /* if book available then create borrow and
         pass userId and bookId that i defined above 
        */
        // make book unavailable cause user borrow it
        // save the new status of booke
        // res===> book that borrowed  
    }

}

// returnBook
const returnBook = async (req, res) => {
    const { bookId } = req.params;
    const userId = req.user.id;
    // get bookId from param to search about book if its borrowed or not
    // get userId from decoded token
    const borrow = await Borrow.findOne({
        where: {
            userId,
            bookId,
            returned: false
        }
    })
    if (!borrow) {
        res.status(404).json({ message: "you not borrow this book" })
         // search about book by bookId
        // check if book borrowed or not
    } else {
        borrow.returned = true
        await borrow.save()
        const book = await Book.findByPk(bookId);
        book.available = true
        await book.save()
        res.status(200).json({ message: "returned book is done" })
        /*
        if book was borrowed then change returned to true and save change
        then search for book to make it avaliable to borrow again 
        and save change that occar on book
         */

    }
}

// list of borrowedBook
const borrowedBooks=async(req,res)=>{
    const userId=req.user.id;
    const borrowBooks=await Borrow.findAndCountAll({
        where:{
            userId,
            returned:false
        }
    })

    res.status(200).json({message:"all book you have",borrowBooks:borrowBooks.count,books:borrowBooks.rows})
}

export {
    borrowBook,
    returnBook,
    borrowedBooks
}