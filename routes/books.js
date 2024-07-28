const express = require("express");
const {books} = require("../data/books.json")

const router = express.Router();


/**
 * Route: /books
 * Method: GET
 * Description: Get all books
 * Access: Public
 * Parameters: None
 */
router.get("/", (req, res)=>{
    res.status(200).json({
        success: true,
        data: books,
    })
})

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get book by their id
 * Access: Public
 * Parameters: Id
 */
router.get("/:id", (req, res)=>{
    const {id} = req.params;
    const book = books.find((each)=> each.id ===id);
    if(!book){
        return res.status(404).json({
    success: false,
    message: "book Not Found"
    })}

    return res.status(200).json({
        success: true,
        data: book
    })
})


/**
 * Route: /books
 * Method: POST
 * Description: add a new book
 * Access: Public
 * Parameters: None
 */
router.post("/", (req, res)=>{
    const {id, name, author, genre, price, publisher} = req.body;

    const book = books.find((each)=> each.id === id);

    if(book){
        return res.status(404).json({
            success: false,
            message: "book already exists with the given ID"
        })
    }
    books.push({id, name, author, genre, price, publisher});
    return res.status(201).json({
        success: true,
        data: books
    })
})


/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book by their ID
 * Access: Public
 * Parameters: ID
 */
router.put('/:id', (req, res)=>{
     const {id} = req.params;
     const {data} = req.body;

    const book = books.find((each)=> each.id ===id);
    if(!book){
        return res.status(404).json({
    success: false,
    message: "Book Not Found"
    })}

    const updateBook = books.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data
            }
        }
        return each;
    })
    
    return res.status(200).json({
        success: true,
        data: updateBook
    })
})


/**
 * Route: /books/:id
 * Method: DELETE
 * Description: Deleting a book by their ID
 * Access: Public
 * Parameters: ID
 */
router.delete("/:id", (req, res)=>{
     const {id} = req.params;

    const book = books.find((each)=> each.id ===id);
    if(!book){
        return res.status(404).json({
    success: false,
    message: "book Not Found"
    })}


    const index = books.indexOf(book);
    books.splice(index,1);

    return res.status(200).json({
        success: true,
        data: book
    })
})



module.exports = router;